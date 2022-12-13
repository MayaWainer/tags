import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import {TagService} from "../tag.service";
import {TagDto} from "../dto/tag.dto";
import {FindManyTags} from "../input/findManyTags.input";
import {Tag} from "../interface/tag.interface";
import {TagConfigurationService} from "../../tagConfiguration/tagConfiguration.service";
import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";
import {TagConfigurationInterface} from "../../tagConfiguration/dto/tagConfiguration.interface";

@Resolver(() => TagDto)
export class TagResolver {
    constructor(private readonly tagService: TagService, private readonly tagConfigurationService: TagConfigurationService) {}

    @ResolveField(() => TagConfigurationInterface)
    tagConfiguration(@Parent() tag: Tag): TagConfiguration {
        return this.tagConfigurationService.getTagConfiguration(tag.configurationId)
    }

    @Query(returns => TagDto)
    getTag(@Args('id') id: number): Tag {
        return this.tagService.getTag(id)
    }

    @Query(returns => [TagDto])
    getManyTags(@Args('input') input: FindManyTags): Tag[] {
        return this.tagService.getManyTags(input)
    }

    @Query(returns => [TagDto])
    getAllTags(): Tag[] {
        return this.tagService.getAllTag()
    }
}
