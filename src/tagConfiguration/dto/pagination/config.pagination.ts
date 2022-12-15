import { Field, InputType, Int } from '@nestjs/graphql'

@InputType('OffsetPaginationInput')
export class PaginationInput {
    @Field(() => Int)
    offset!: number

    @Field(() => Int)
    limit!: number
}
