import { Field, Float, Int, InterfaceType } from '@nestjs/graphql'
import {TagType} from "../../common/enum/tagType.enum";
import {ValueArrayTagConfigurationDto} from "./valueArrayTagConfiguration.dto";

@InterfaceType('TagConfigurationInterface', {
    resolveType: (value) => {
        return ValueArrayTagConfigurationDto
    }
})
export abstract class TagConfigurationInterface {
    @Field(() => Int)
    id!: number

    @Field(() => TagType)
    type!: TagType

    @Field()
    name!: string
}
