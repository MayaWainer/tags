import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class ConfigFilter {
    @Field(() => [Int], { nullable: true })
    ids?: [number]
}
