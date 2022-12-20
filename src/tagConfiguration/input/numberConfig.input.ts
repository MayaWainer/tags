import {Field, InputType} from '@nestjs/graphql'

@InputType('NumberTagConfigInput')
export class NumberTagConfigInput {

    @Field({ nullable: true })
    min?: number

    @Field({ nullable: true })
    max?: number
}
