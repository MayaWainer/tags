import { ArgsType, Field } from '@nestjs/graphql'
import {PaginationInput} from "./pagination/config.pagination";

@ArgsType()
export class ValueListArgs {
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    valueListPagination?: PaginationInput
}
