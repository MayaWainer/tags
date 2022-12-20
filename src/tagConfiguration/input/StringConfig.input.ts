import {Field, InputType} from '@nestjs/graphql'
import {GraphQLPositiveFloat} from "graphql-scalars";

@InputType('StringTagConfigInput')
export class StringConfigInput{
    @Field(() => GraphQLPositiveFloat,{nullable: true})
    charCount?: number
}
