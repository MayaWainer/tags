import {Field, InputType} from '@nestjs/graphql'
import {ArrayMinSize, IsArray} from "class-validator"

@InputType('ValueListTagConfigInput')
export class ValueListConfigInput{

    @Field(() => [String])
    @IsArray()
    @ArrayMinSize(1)
    values!: string[]
}
