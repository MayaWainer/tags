import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {TagConfigurationType, TaggableEntities} from "../../../common/enum/tagType.enum";
import {TagConfigurationInterface} from "../tagConfiguration.interface";

@ObjectType('StringConfiguration', {
    implements: () => [TagConfigurationInterface]
})
export class StringConfigurationDto implements TagConfigurationInterface {

    @Field(() => Int)
    id!: number

    @Field()
    name!: string

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType.String

    @Field(() => Boolean)
    allowMultiple!: boolean

    @Field(()=> [TaggableEntities])
    applyTo!: TaggableEntities[]

    @Field()
    charCount?: number
}
