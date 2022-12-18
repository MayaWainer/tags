import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ValueListFilter {
    @Field(() => [String])
    values!: [string]
}
