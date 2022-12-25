import {Injectable} from '@nestjs/common';
import {Expense} from "./interface/expense.interface";
import { paginateResults} from "../common/paginationFuncs";
import {ExpensesFilter} from "./dto/args/pagination/filter";
import {Readable} from "stream";
import {toChunks} from "../common/utils/chunk";
import * as parser from 'json2csv'
import * as fs from "fs";
import {TagConfigurationService} from "../tagConfiguration/tagConfiguration.service";
import {ExpenseService} from "./expense.service";

@Injectable()
export class ExportService {
    readonly #MAX_ALLOWED_EXPENSES_EXPORT = 10_000
    constructor(private readonly ExpenseService: ExpenseService, private readonly configService: TagConfigurationService) {}

    async exportAllExpensesPaginated(input: ExpensesFilter) {
        await this.validateExport(input)
        const rawExportData = await this.getRawExportData(input)
        const transformedExportData = await this.transformExportData({ rawExportData: rawExportData })
        const exportSignedUrl = await this.createExportAsset(transformedExportData)
        return exportSignedUrl
    }

    private async validateExport(input: ExpensesFilter): Promise<void | never> {
        let {metadata: { totalCount }} = this.ExpenseService.getAllExpensesPaginated({filter: input})
        if (!totalCount) {
            throw new Error('no objects to export')
        }
        if (totalCount > this.maxAllowedExpensesExport) {
            throw new Error(`number of objects to export exceeds allowed maximum value: ${this.maxAllowedExpensesExport}`)
        }
    }

    private async getRawExportData(input: ExpensesFilter): Promise<Readable> {
        let expenses = this.ExpenseService.getAllExpensesPaginated({filter: input})
        const chunks = toChunks({ chunkSize: 2, totalSize: expenses.metadata.totalCount })
        const stream = new Readable()
        for (const chunk of chunks) {
            const expensesPaginated = paginateResults(expenses.items, {filter: input, pagination: { limit: chunk.to, offset: chunk.from }})
            expensesPaginated.items.forEach((e) => stream.push(JSON.stringify(e)))
        }
        stream.push(null) // to indicate end of data
        return stream
    }

    private transformExportData(params: { rawExportData: Readable }): Readable {
        let configurations = this.configService.getAllTagConfigurationsPaginated({})
        console.log(configurations)
        // const CompanyTagNames = configurations.items.map(c => {
        //     return c.name
        // })
        const json2csvTransformer = new parser.Transform({
            transforms: [
                (originalRow: Expense) => {
                    try {
                        let tags = {}
                        // CompanyTagNames.map(name => {
                        //     const tag = originalRow.tags.find(t => t.name === name)
                        //     tags[name] = tag? tag.values.join(', ') : ''
                        // })
                        const data = {
                            id: originalRow.id,
                            'Amount In Card Currency': originalRow.amountInCardCurrency ?? '',
                            'Conversion Rate': originalRow.conversionRate ?? '',
                            'Merchant Name': originalRow.merchantName ?? '',
                            'Date': originalRow.createdAt ?? ''
                        }
                        originalRow.tags.map((tag)=>{
                            let tagValues = tag.values.join(', ')
                            let name = configurations.items[tag.configurationId].name
                            console.log(name)
                            data[name] = tagValues
                        })
                        console.log(data)
                        return data
                    } catch (e) {
                        throw new Error(`error while transforming original: ${originalRow}`)
                    }
                }
            ]
        })
        return params.rawExportData.pipe(json2csvTransformer)
    }

    private async createExportAsset(exportData: Readable): Promise<string> {
        const now = Date.now()
        const path = `Expenses_Export_${now}.csv`
        const file = fs.createWriteStream(path)
        exportData.pipe(file)
        file.on('end',()=>console.log('done'))
        return path
    }

    get maxAllowedExpensesExport(): number {
        return this.#MAX_ALLOWED_EXPENSES_EXPORT
    }
}
