import {Injectable} from '@nestjs/common';
import {Expense} from "./interface/expense.interface";
import {RepositoryService} from "../mockData/repository.mock";
import {Entities} from "../common/enum/tagType.enum";
import {GetManyExpensesArgs} from "./dto/args/getMany.args";
import {filter, paginateResults} from "../common/paginationFuncs";
import {IPaginatedType} from "../common/pagination/paginated";
import {ExpensesFilter} from "./dto/args/pagination/filter";
import {Readable} from "stream";
import {toChunks} from "../common/utils/chunk";
import * as parser from 'json2csv'
import * as fs from "fs";
import {TagConfigurationService} from "../tagConfiguration/tagConfiguration.service";

@Injectable()
export class ExpenseService {
    readonly #MAX_ALLOWED_EXPENSES_EXPORT = 10_000
    constructor(private readonly ExpenseRepo: RepositoryService<Expense>, private readonly configService: TagConfigurationService) {}

    get(id: number): Expense {
        return this.ExpenseRepo.getOne(Entities.Expense, 'id', id)
    }

    getAllExpensesPaginated(args: GetManyExpensesArgs): IPaginatedType<Expense> {
        let expenses = this.ExpenseRepo.getAll(Entities.Expense)
        return paginateResults(expenses, args)
    }

    async exportAllExpensesPaginated(input: ExpensesFilter) {
        await this.validateExport(input)
        const rawExportData = await this.getRawExportData(input)
        const transformedExportData = await this.transformExportData({ rawExportData: rawExportData })
        const exportSignedUrl = await this.createExportAsset(transformedExportData)
        return exportSignedUrl
    }

    async validateExport(input: ExpensesFilter): Promise<void | never> {
        let expenses = this.ExpenseRepo.getAll(Entities.Expense)
        const filteredExpenses = filter(expenses, input.ids, 'id')
        const numberOfObjectsToExport = filteredExpenses.length
        if (!numberOfObjectsToExport) {
            throw new Error('no objects to export')
        }
        if (numberOfObjectsToExport > this.maxAllowedExpensesExport) {
            throw new Error(`number of objects to export exceeds allowed maximum value: ${this.maxAllowedExpensesExport}`)
        }
    }

    async getRawExportData(input: ExpensesFilter): Promise<Readable> {
        let expenses = this.ExpenseRepo.getAll(Entities.Expense)
        const filteredExpenses = filter(expenses, input.ids, 'id')
        const numberOfObjectsToExport = filteredExpenses.length
        const chunks = toChunks({ chunkSize: 2, totalSize: numberOfObjectsToExport })
        const stream = new Readable()
        for (const chunk of chunks) {
            const expensesPaginated = paginateResults(expenses, {filter: input, pagination: { limit: chunk.to, offset: chunk.from }})
            expensesPaginated.items.forEach((e) => stream.push(JSON.stringify(e)))
        }
        stream.push(null) // to indicate end of data
        return stream
    }

    transformExportData(params: { rawExportData: Readable }): Readable {
        let configurations = this.configService.getAllTagConfigurationsPaginated({})
        console.log(configurations)
        const tagNames = configurations.items.map(c => {
            return c.name
        })
        console.log(tagNames)
        const json2csvTransformer = new parser.Transform({
            transforms: [
                (originalRow: Expense) => {
                    try {
                        let tags = {}
                        tagNames.map(name => {
                            const tag = originalRow.tags.find(t => t.name === name)
                            tags[name] = tag? tag.values.join(', ') : ''
                        })
                        return {
                            id: originalRow.id,
                            'Amount In Card Currency': originalRow.amountInCardCurrency ?? '',
                            'Conversion Rate': originalRow.conversionRate ?? '',
                            'Merchant Name': originalRow.merchantName ?? '',
                            'Date': originalRow.createdAt ?? '',
                            ...tags
                        }
                    } catch (e) {
                        throw new Error(`error while transforming original: ${originalRow}`)
                    }
                }
            ]
        })
        return params.rawExportData.pipe(json2csvTransformer)
    }

    async createExportAsset(exportData: Readable): Promise<string> {
        const now = Date.now()
        const path = `Expenses_Export_${now}.csv`
        //save on fs - return path
        const file = fs.createWriteStream(path)
        exportData.pipe(file)
        file.on('end',()=>console.log('done'))
        return path
    }

    get maxAllowedExpensesExport(): number {
        return this.#MAX_ALLOWED_EXPENSES_EXPORT
    }
}
