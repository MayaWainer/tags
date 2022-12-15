import {Field, InputType} from '@nestjs/graphql'

@InputType('NumberTagConfigInput')
export class NumberTagConfigInput{

    @Field()
    min?: number

    @Field()
    max?: number
}
