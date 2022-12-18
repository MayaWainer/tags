import {ArgsType, Field} from "@nestjs/graphql";
import {PaginationInput} from "../../../common/pagination/pagination.input";
import {CardSort} from "./pagination/sort";
import {CardsFilter} from "./pagination/filter";
import {FindManyPaginatedArgs} from "../../../common/pagination/pagination.args";

@ArgsType()
export class GetManyCardsArgs implements FindManyPaginatedArgs{
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    pagination?: PaginationInput

    @Field(() => CardSort, { nullable: true })
    sorting?: CardSort

    @Field(() => CardsFilter, { nullable: true })
    filter?: CardsFilter
}
