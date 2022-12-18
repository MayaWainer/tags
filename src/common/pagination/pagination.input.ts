import { Field, InputType, Int } from '@nestjs/graphql'
import { Max } from 'class-validator'
import { GraphQLPositiveInt } from 'graphql-scalars'

@InputType('PaginationInput')
export class PaginationInput {
    @Field(() => Int)
    offset!: number

    @Field(() => GraphQLPositiveInt)
    @Max(100)
    limit!: number
}
