import {Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {ValueListConfigurationDto} from "../dto/valueListTagConfiguration.dto";
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationType} from "../../common/enum/tagType.enum";

@Resolver(() => ValueListConfigurationDto)
export class ValueListTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField(() => [String])
    valueList(@Parent() config: TagConfiguration): string[] {
        if(config.type === TagConfigurationType.ValueList)
            return config.valueList
    }
}
