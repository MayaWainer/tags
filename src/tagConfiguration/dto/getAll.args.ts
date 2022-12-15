import { ArgsType, Field } from '@nestjs/graphql'
import {ConfigSort} from "./pagination/config.sort";
import {ConfigFilter} from "./pagination/config.filter";
import {PaginationInput} from "./pagination/config.pagination";

@ArgsType()
export class GetManyConfigurationsArgs {
    @Field(() => PaginationInput, { nullable: true, defaultValue: { offset: 0, limit: 20 } })
    pagination?: PaginationInput

    @Field(() => ConfigSort, { nullable: true })
    sorting?: ConfigSort

    @Field(() => ConfigFilter, { nullable: true })
    filter?: ConfigFilter
}
