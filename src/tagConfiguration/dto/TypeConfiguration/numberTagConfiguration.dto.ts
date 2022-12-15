import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {TagConfigurationType, TaggableEntities} from "../../../common/enum/tagType.enum";
import {TagConfigurationInterface} from "../tagConfiguration.interface";

@ObjectType('NumberConfiguration', {
    implements: () => [TagConfigurationInterface]
})
export class NumberConfigurationDto implements TagConfigurationInterface {

    @Field(() => Int)
    id!: number

    @Field()
    name!: string

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType.Number

    @Field(() => Boolean)
    allowMultipleValues!: boolean

    @Field(()=> [TaggableEntities])
    taggableEntities!: TaggableEntities[]

    @Field()
    min?: number

    @Field()
    max?: number
}
