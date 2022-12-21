import {Field, InputType} from '@nestjs/graphql'
import { IsArray, ArrayMinSize } from 'class-validator';
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";
import { FileUpload, GraphQLUpload } from 'graphql-upload'

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

    @Field(() => GraphQLUpload)
    valuesFile!: FileUpload
}
