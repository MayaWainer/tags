import {Field, InputType} from '@nestjs/graphql'
import { IsArray, ArrayMinSize } from 'class-validator';
import { TaggableEntities} from "../../common/enum/tagType.enum";
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import {GraphQLPositiveInt} from "graphql-scalars";

@InputType('LoadValueTagConfigurationInput')
export class LoadValueTagConfigurationInput{

    @Field()
    name!: string

    @Field(() => Boolean)
    allowMultiple!: boolean

    @Field(() => GraphQLPositiveInt, { nullable: true })
    taggedValuesLimit?: number

    @Field(()=> [TaggableEntities])
    @IsArray()
    @ArrayMinSize(1)
    taggableEntities!: TaggableEntities[]

    @Field(() => GraphQLUpload)
    valuesFile!: FileUpload
}
