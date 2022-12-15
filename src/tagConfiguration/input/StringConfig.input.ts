import {Field, InputType} from '@nestjs/graphql'

@InputType('StringTagConfigInput')
export class StringConfigInput{
    @Field()
    charCount?: number
}
