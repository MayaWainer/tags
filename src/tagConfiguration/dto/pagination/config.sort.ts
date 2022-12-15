import { InputType, Field} from '@nestjs/graphql'
import {ConfigSortKey, SortDirection} from "../../../common/enum/enum";

@InputType()
export class ConfigSort {
    @Field(() => ConfigSortKey)
    sortBy!: ConfigSortKey

    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    sortDirection!: SortDirection
}
