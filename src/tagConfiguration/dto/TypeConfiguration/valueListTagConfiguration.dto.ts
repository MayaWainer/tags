import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {TagConfigurationType, TaggableEntities} from "../../../common/enum/tagType.enum";
import {TagConfigurationInterface} from "../tagConfiguration.interface";

@ObjectType('ValueListConfiguration', {
    implements: () => [TagConfigurationInterface]
})
export class ValueListConfigurationDto implements TagConfigurationInterface {

    @Field(() => Int)
    id!: number

    @Field()
    name!: string

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType.ValueList

    @Field(() => Boolean)
    allowMultipleValues!: boolean

    @Field(()=> [TaggableEntities])
    taggableEntities!: TaggableEntities[]

    //TODO: this length of the list-of-values can vary drastically. (can be hundreds of values). - should be paginated
    @Field(() => [String])
    valueList!: string[]
}
