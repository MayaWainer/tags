import {Resolver, ResolveField, Parent} from '@nestjs/graphql';
import {TagDto} from "../dto/tag.dto";
import {Tag} from "../interface/tag.interface";
import {TagConfigurationService} from "../../tagConfiguration/tagConfiguration.service";
import {TagConfigurationInterface} from "../../tagConfiguration/dto/tagConfiguration.interface";
import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";

@Resolver(() => TagDto)
export class TagResolver {
    constructor(protected readonly tagConfigurationService: TagConfigurationService) {}

    @ResolveField(() => TagConfigurationInterface)
    configuration(@Parent() object: Tag): TagConfiguration {
        return this.tagConfigurationService.getTagConfiguration(object.configurationId)
    }
}
