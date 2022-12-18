import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CardsFilter {
    @Field(() => [Int], { nullable: true })
    ids?: [number]
}
