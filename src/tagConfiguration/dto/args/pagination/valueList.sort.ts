import {Field, InputType} from '@nestjs/graphql'
import {SortDirection} from "../../../../common/enum/sort.enum";

@InputType()
export class ValueListSort {
    @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
    sortDirection!: SortDirection
}
