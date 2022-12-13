import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {TagType} from "../../common/enum/tagType.enum";
import {TagConfigurationInterface} from "./tagConfiguration.interface";

@ObjectType('ValueArrayTagConfigurationDto', {
    implements: () => [TagConfigurationInterface]
})
export class ValueArrayTagConfigurationDto implements TagConfigurationInterface {

    @Field(() => Int)
    id!: number

    @Field(() => TagType)
    type!: TagType

    @Field()
    name!: string

    @Field(() => [String])
    values!: string[]
}
