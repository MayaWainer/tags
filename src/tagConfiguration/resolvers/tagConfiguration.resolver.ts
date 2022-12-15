import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationInterface} from "../dto/tagConfiguration.interface";
import {CreateTagConfigurationInput} from "../input/createTagConfiguration.input";
import {GetManyConfigurationsArgs} from "../dto/getAll.args";
import {ValueListArgs} from "../dto/valueList.args";
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";

@Resolver(() => TagConfigurationInterface)
export class TagConfigurationResolver {
    constructor(protected readonly tagService: TagConfigurationService) {}

    @ResolveField(() => Boolean)
    allowMultiple(@Parent() config: TagConfiguration): boolean {
        return config.allowMultipleValues
    }

    @ResolveField(() => [TaggableEntities])
    applyTo(@Parent() config: TagConfiguration): TaggableEntities[] {
        return config.taggableEntities
    }

    @Query(returns => TagConfigurationInterface)
    getTagConfiguration(@Args('id') id: number): TagConfiguration {
        return this.tagService.getTagConfiguration(id)
    }

    @Query(returns => [TagConfigurationInterface])
    getAllTagConfigurations(@Args() args: GetManyConfigurationsArgs): TagConfiguration[] {
        return this.tagService.getAllTagConfigurationsPaginated(args)
    }

    @Mutation(returns => TagConfigurationInterface)
    createTagConfiguration(@Args('input') input: CreateTagConfigurationInput): TagConfiguration {
        return this.tagService.createTagConfiguration(input)
    }
}
