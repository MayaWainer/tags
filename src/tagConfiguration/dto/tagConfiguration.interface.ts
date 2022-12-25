import { Field, Float, Int, InterfaceType } from '@nestjs/graphql'
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";
import {ValueListConfigurationDto} from "./TypeConfiguration/valueListTagConfiguration.dto";
import {StringConfigurationDto} from "./TypeConfiguration/stringTagConfiguration.dto";
import {NumberConfigurationDto} from "./TypeConfiguration/numberTagConfiguration.dto";
import {GraphQLPositiveInt} from "graphql-scalars";


@InterfaceType('TagConfiguration', {
    resolveType: (value) => {
        switch (value.type){
            case TagConfigurationType.ValueList: return ValueListConfigurationDto
            case TagConfigurationType.String: return StringConfigurationDto
            case TagConfigurationType.Number: return NumberConfigurationDto
        }
    }
})

export abstract class TagConfigurationInterface {
    @Field(() => Int)
    id!: number

    @Field()
    name!: string

    @Field(() => TagConfigurationType)
    type!: TagConfigurationType

    @Field(() => Boolean)
    allowMultiple!: boolean

    @Field(() => GraphQLPositiveInt, { nullable: true })
    taggedValuesLimit?: number

    @Field(()=> [TaggableEntities])
    applyTo!: TaggableEntities[]
}
