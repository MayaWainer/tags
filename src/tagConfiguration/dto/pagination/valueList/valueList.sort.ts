import { InputType, Field} from '@nestjs/graphql'
import {SortDirection} from "../../../../common/enum/enum";

@InputType()
export class ConfigSort {
    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    sortDirection!: SortDirection
}
