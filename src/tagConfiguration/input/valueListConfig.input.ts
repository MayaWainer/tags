import {Field, InputType} from '@nestjs/graphql'

@InputType('ValueListTagConfigInput')
export class ValueListConfigInput{

    @Field(() => [String])
    values!: string[]
}
