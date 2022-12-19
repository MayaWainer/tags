import {Field, Float, InputType, Int, ObjectType} from '@nestjs/graphql'
import { IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";
import {ValueListConfigInput} from "./valueListConfig.input";
import {StringConfigInput} from "./StringConfig.input";
import {NumberTagConfigInput} from "./numberConfig.input";

@InputType('CreateTagConfigurationInput')
export class CreateTagConfigurationInput{

    @Field()
    name!: string

    @Field(() => Boolean)
    allowMultiple!: boolean

    @Field(()=> [TaggableEntities])
    @IsArray()
    @ArrayMinSize(1)
    taggableEntities!: TaggableEntities[]

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType

    @Field(() => ValueListConfigInput, {nullable: true})
    valueListTagConfig?: ValueListConfigInput

    @Field(() => StringConfigInput, {nullable: true})
    stringTagConfig?: StringConfigInput

    @Field(() => NumberTagConfigInput, {nullable: true})
    numberTagConfig?: NumberTagConfigInput
}
