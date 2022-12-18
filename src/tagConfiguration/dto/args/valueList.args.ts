import { ArgsType, Field } from '@nestjs/graphql'
import {PaginationInput} from "../../../common/pagination/pagination.input";
import {ValueListFilter} from "./pagination/valueList.filter";
import {ValueListSort} from "./pagination/valueList.sort";

@ArgsType()
export class ValueListArgs {
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    pagination?: PaginationInput

    @Field(() => ValueListSort, { nullable: true })
    sorting?: ValueListSort

    @Field(() => ValueListFilter, { nullable: true })
    filter?: ValueListFilter
}
