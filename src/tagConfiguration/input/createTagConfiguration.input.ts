import {Field, Float, InputType, Int, ObjectType} from '@nestjs/graphql'
import {TagType} from "../../common/enum/tagType.enum";
import {ValueArrayConfigInput} from "./valueArrayConfig.input";

@InputType('CreateTagConfigurationInput')
export class CreateTagConfigurationInput{

    @Field()
    name!: string

    @Field(() => TagType)
    type!: TagType

    @Field(() => ValueArrayConfigInput)
    valueArrayConfig?: ValueArrayConfigInput
}
