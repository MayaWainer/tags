import {Injectable} from '@nestjs/common';
import {Expense} from "./interface/expense.interface";
import {RepositoryService} from "../mockData/repository.mock";
import {Entities} from "../common/enum/tagType.enum";
import {GetManyExpensesArgs} from "./dto/args/getMany.args";
import {paginateResults} from "../common/paginationFuncs";
import {IPaginatedType} from "../common/pagination/paginated";

@Injectable()
export class ExpenseService {
    constructor(private readonly ExpenseRepo: RepositoryService<Expense>) {}

    get(id: number): Expense {
        return this.ExpenseRepo.getOne(Entities.Expense, id)
    }

    getAllExpensesPaginated(args: GetManyExpensesArgs): IPaginatedType<Expense> {
        let expenses = this.ExpenseRepo.getAll(Entities.Expense)
        return paginateResults(expenses, args)
    }
}
