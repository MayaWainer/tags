import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import {ValueArrayTagConfigurationDto} from "../dto/valueArrayTagConfiguration.dto";
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";

@Resolver(() => ValueArrayTagConfigurationDto)
export class ValueArrayTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField(() => [String])
    values(@Parent() config: TagConfiguration): string[] {
        if('values' in config.validation)
            return config.validation.values
    }
}
