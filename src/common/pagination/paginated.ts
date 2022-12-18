import { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export interface IPaginatedType<T> {
    items: T[]
    metadata: PaginationMetaData
}

export function Paginated<T>(classRef: any): Type<IPaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedType implements IPaginatedType<T> {
        @Field(() => [classRef])
        items!: T[]

        @Field(() => PaginationMetaData)
        metadata!: PaginationMetaData
    }
    return PaginatedType as Type<IPaginatedType<T>>
}

@ObjectType({ isAbstract: true })
export class PaginationMetaData {
    @Field(() => Int, { description: 'The total count of the items matching the search criteria' })
    totalCount!: number
}
