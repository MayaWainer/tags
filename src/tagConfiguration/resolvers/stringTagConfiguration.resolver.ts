import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {StringConfigurationDto} from "../dto/TypeConfiguration/stringTagConfiguration.dto";

@Resolver(() => StringConfigurationDto)
export class StringTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField()
    charCount(@Parent() config: TagConfiguration): number {
        if(config.type === TagConfigurationType.String)
            return config.charCount
    }
}
