import { Type } from '@nestjs/common'
import { Field, InputType } from '@nestjs/graphql'
import {SortDirection} from "../enum/sort.enum";

export interface ISortInput<T extends Record<string, string>> {
    sortBy: T
    sortDirection: SortDirection
}

export function SortInput<T extends Record<string, any>>(sortKeyEnumRef: T): Type<ISortInput<T>> {
    @InputType(`${JSON.stringify(sortKeyEnumRef.name)}`)
    class SortInput implements ISortInput<T> {
        @Field(() => sortKeyEnumRef)
        sortBy!: typeof sortKeyEnumRef

        @Field(() => SortDirection, { defaultValue: SortDirection.ASC })
        sortDirection!: SortDirection
    }

    return SortInput as Type<ISortInput<T>>
}
