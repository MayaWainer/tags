import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {TagConfigurationInterface} from "./tagConfiguration.interface";

@ObjectType('ValueArrayTagConfigurationDto', {
    implements: () => [TagConfigurationInterface]
})
export class ValueArrayTagConfigurationDto implements TagConfigurationInterface {

    @Field(() => Int)
    id!: number


    //TODO: the type of each specific implementation of tagConfiguration is pre-determined...
    @Field(() => TagConfigurationType)
    type!: TagConfigurationType

    @Field()
    name!: string

    //TODO: this length of the list-of-values can vary drastically. (can be hundreds of values). - should be paginated
    @Field(() => [String])
    values!: string[]
}
