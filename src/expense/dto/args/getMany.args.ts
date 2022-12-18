import {ArgsType, Field} from "@nestjs/graphql";
import {PaginationInput} from "../../../common/pagination/pagination.input";
import {ExpenseSort} from "./pagination/sort";
import { ExpensesFilter} from "./pagination/filter";
import {FindManyPaginatedArgs} from "../../../common/pagination/pagination.args";

@ArgsType()
export class GetManyExpensesArgs  implements FindManyPaginatedArgs{
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    pagination?: PaginationInput

    @Field(() => ExpenseSort, { nullable: true })
    sorting?: ExpenseSort

    @Field(() => ExpensesFilter, { nullable: true })
    filter?: ExpensesFilter
}
