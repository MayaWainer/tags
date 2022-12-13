import { Field, InputType, Int } from '@nestjs/graphql'

@InputType('UpdateTagConfigurationInput')
export class UpdateTagInput {
    @Field(() => Int)
    id!: number
    //
    // @Field()
    // name?: string
}
