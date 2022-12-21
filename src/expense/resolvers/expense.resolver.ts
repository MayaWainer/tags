import { Args, Query, Resolver } from '@nestjs/graphql';
import {ExpenseDto} from "../dto/expense.dto";
import {ExpenseService} from "../expense.service";
import {Expense} from "../interface/expense.interface";
import {TaggableResolver} from "../../tag/resolvers/taggable.resolver";
import {TagService} from "../../tag/tag.service";
import {IPaginatedType} from "../../common/pagination/paginated";
import {PaginatedExpenses} from "../dto/expenses.paginated";
import {GetManyExpensesArgs} from "../dto/args/getMany.args";
import {GraphQLVoid} from "graphql-scalars";
import {ExpensesFilter} from "../dto/args/pagination/filter";
import {ExportService} from "../export";

@Resolver(() => ExpenseDto)
export class ExpenseResolver extends TaggableResolver{
    constructor(private readonly expenseService: ExpenseService, readonly tagService: TagService, readonly exportService: ExportService) {
        super(tagService)
    }

    @Query(returns => ExpenseDto)
    getExpense(@Args('id') id: number): Expense {
        return this.expenseService.get(id)
    }

    @Query(returns => PaginatedExpenses)
    getAllExpensesPaginated(@Args() args: GetManyExpensesArgs): IPaginatedType<Expense>{
        return this.expenseService.getAllExpensesPaginated(args)
    }

    @Query(returns => String)
    async exportAllExpenses(@Args('filter') filter: ExpensesFilter): Promise<string>{
        // return this.expenseService.exportAllExpensesPaginated(filter)
        return this.exportService.exportAllExpensesPaginated(filter)
    }
}
