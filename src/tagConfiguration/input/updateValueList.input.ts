import {Field, InputType} from '@nestjs/graphql'
import {ArrayMinSize, IsArray} from "class-validator"

@InputType('UpdateValueListTagInput')
export class UpdateValueListInput{

    @Field(() => [String], { nullable: true })
    addValues?: string[]

    @Field(() => [String], { nullable: true })
    removeValues?: string[]
}
