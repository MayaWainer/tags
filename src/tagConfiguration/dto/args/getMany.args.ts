import {ArgsType, Field} from "@nestjs/graphql";
import {PaginationInput} from "../../../common/pagination/pagination.input";
import {ConfigSort} from "./pagination/sort";
import {ConfigFilter} from "./pagination/filter";
import {FindManyPaginatedArgs} from "../../../common/pagination/pagination.args";

@ArgsType()
export class GetManyConfigurationsArgs  implements FindManyPaginatedArgs{
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    pagination?: PaginationInput

    @Field(() => ConfigSort, { nullable: true })
    sorting?: ConfigSort

    @Field(() => ConfigFilter, { nullable: true })
    filter?: ConfigFilter
}
