import { Args, Query, Resolver } from '@nestjs/graphql';
import {ExpenseDto} from "./dto/expense.dto";
import {ExpenseService} from "./expense.service";

@Resolver(of => ExpenseDto)
export class ExpenseResolver {
    constructor(private readonly expenseService: ExpenseService) {}

    @Query(returns => ExpenseDto)
    async expense(@Args('id') id: string): Promise<ExpenseDto> {
        return this.expenseService.get()
    }
}
