import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import {ExpenseDto} from "../dto/expense.dto";
import {ExpenseService} from "../expense.service";
import {Expense} from "../interface/expense.interface";
import {TaggableResolver} from "../../tag/resolvers/taggable.resolver";
import {TagService} from "../../tag/tag.service";

@Resolver(() => ExpenseDto)
export class ExpenseResolver extends TaggableResolver{
    constructor(private readonly expenseService: ExpenseService, readonly tagService: TagService) {
        super(tagService)
    }

    @Query(returns => ExpenseDto)
    getExpense(@Args('id') id: number): Expense {
        return this.expenseService.get(id)
    }

    @Query(returns => [ExpenseDto])
    getAllExpenses(): Expense[] {
        return this.expenseService.getAll()
    }
}
