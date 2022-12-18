import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ExpensesFilter {
    @Field(() => [Int], { nullable: true })
    ids?: [number]
}
