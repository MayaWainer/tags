import { Field, InputType, Int } from '@nestjs/graphql'
import {ValueListConfigInput} from "./valueListConfig.input";
import {StringConfigInput} from "./StringConfig.input";
import {NumberTagConfigInput} from "./numberConfig.input";

@InputType('UpdateTagConfigurationInput')
export class UpdateTagConfigurationInput{
    @Field(() => Int)
    id!: number

    @Field()
    name?: string

    @Field(() => ValueListConfigInput)
    valueListTagConfig?: ValueListConfigInput

    @Field(() => StringConfigInput)
    stringTagConfig?: StringConfigInput

    @Field(() => NumberTagConfigInput)
    numberTagConfig?: NumberTagConfigInput
}
