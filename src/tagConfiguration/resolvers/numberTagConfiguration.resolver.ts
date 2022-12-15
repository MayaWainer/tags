import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {NumberConfigurationDto} from "../dto/TypeConfiguration/numberTagConfiguration.dto";

@Resolver(() => NumberConfigurationDto)
export class NumberTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField()
    min(@Parent() config: TagConfiguration): number {
        if(config.type === TagConfigurationType.Number)
            return config.min
    }

    @ResolveField()
    max(@Parent() config: TagConfiguration): number {
        if(config.type === TagConfigurationType.Number)
            return config.max
    }
}
