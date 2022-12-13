import { Field, Float, Int, InterfaceType } from '@nestjs/graphql'
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {ValueArrayTagConfigurationDto} from "./valueArrayTagConfiguration.dto";

@InterfaceType('TagConfigurationInterface', {
    resolveType: (value) => {
        return ValueArrayTagConfigurationDto
    }
})

export abstract class TagConfigurationInterface {
    @Field(() => Int)
    id!: number

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType

    @Field()
    name!: string
}
