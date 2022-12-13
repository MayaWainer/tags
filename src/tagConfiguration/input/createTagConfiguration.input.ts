import {Field, Float, InputType, Int, ObjectType} from '@nestjs/graphql'
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {ValueArrayConfigInput} from "./valueArrayConfig.input";

@InputType('CreateTagConfigurationInput')
export class CreateTagConfigurationInput{

    @Field()
    name!: string

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType

    @Field(() => ValueArrayConfigInput)
    valueArrayConfig?: ValueArrayConfigInput
}
