import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationInterface} from "../dto/tagConfiguration.interface";
import {CreateTagConfigurationInput} from "../input/createTagConfiguration.input";
import {UpdateTagConfigurationInput} from "../input/updateTagConfiguration.input";

@Resolver(() => TagConfigurationInterface)
export class TagConfigurationResolver {
    constructor(protected readonly tagService: TagConfigurationService) {}

    @Query(returns => TagConfigurationInterface)
    getTagConfiguration(@Args('id') id: number): TagConfiguration {
        return this.tagService.getTagConfiguration(id)
    }

    @Query(returns => [TagConfigurationInterface])
    getAllTagConfigurations(): TagConfiguration[] {
        return this.tagService.getAllTagConfigurations()
    }

    @Mutation(returns => TagConfigurationInterface)
    createTagConfiguration(@Args('input') input: CreateTagConfigurationInput): TagConfiguration {
        return this.tagService.createTagConfiguration(input)
    }

    // @Mutation(returns => TagConfigurationInterface)
    // updateTagConfiguration(@Args('input') input: UpdateTagConfigurationInput): TagConfiguration {
    //     return this.tagService.updateTagConfiguration(input)
    // }
}
