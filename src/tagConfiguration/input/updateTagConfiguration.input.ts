import { Field, InputType, Int } from '@nestjs/graphql'
import {ValueArrayConfigInput} from "./valueArrayConfig.input";

@InputType('UpdateTagConfigurationInput')
export class UpdateTagConfigurationInput{
    @Field(() => Int)
    id!: number

    @Field()
    name?: string

    @Field(() => ValueArrayConfigInput)
    valueArrayConfig?: ValueArrayConfigInput
}
