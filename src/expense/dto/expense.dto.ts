import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('Expense')
export class ExpenseDto {
    @Field(() => Int)
    id!: number

    @Field()
    amountInCardCurrency!: number

    @Field()
    conversionRate!: number

    @Field()
    merchantName?: string

    @Field()
    createdAt!: string
}
