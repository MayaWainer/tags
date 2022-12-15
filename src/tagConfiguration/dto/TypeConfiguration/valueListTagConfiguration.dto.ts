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
    allowMultiple!: boolean

    @Field(()=> [TaggableEntities])
    applyTo!: TaggableEntities[]

    @Field(() => [String])
    valueList!: string[]
}
