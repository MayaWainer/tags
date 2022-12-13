import {Field, InputType} from '@nestjs/graphql'

@InputType('ValueArrayConfigInput')
export class ValueArrayConfigInput{

    @Field(() => [String])
    values?: string[]
}
