import {Field, InputType} from '@nestjs/graphql'
import { TaggableEntities} from "../../common/enum/tagType.enum";
import {ValueListConfigInput} from "./valueListConfig.input";
import {StringConfigInput} from "./StringConfig.input";
import {NumberTagConfigInput} from "./numberConfig.input";
import {UpdateValueListInput} from "./updateValueList.input";
import {GraphQLPositiveInt} from "graphql-scalars";

@InputType('UpdateTagConfigurationInput')
export class UpdateTagConfigurationInput {

    @Field()
    id!: number

    @Field(() => Boolean, { nullable: true })
    allowMultiple?: boolean

    @Field(() => GraphQLPositiveInt, { nullable: true })
    taggedValuesLimit?: number

    @Field(()=> [TaggableEntities], { nullable: true })
    taggableEntities?: TaggableEntities[]

    @Field(() => UpdateValueListInput, {nullable: true})
    valueListTagConfig?: UpdateValueListInput

    @Field(() => StringConfigInput, {nullable: true})
    stringTagConfig?: StringConfigInput

    @Field(() => NumberTagConfigInput, {nullable: true})
    numberTagConfig?: NumberTagConfigInput
}
