import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationInterface} from "../dto/tagConfiguration.interface";
import {CreateTagConfigurationInput} from "../input/createTagConfiguration.input";
import {TaggableEntities} from "../../common/enum/tagType.enum";
import {IPaginatedType} from "../../common/pagination/paginated";
import {GetManyConfigurationsArgs} from "../dto/args/getMany.args";
import {PaginatedConfig} from "../dto/config.paginated";
import {UsePipes, ValidationPipe} from "@nestjs/common";
import {GraphQLVoid} from "graphql-scalars";
import {UpdateTagConfigurationInput} from "../input/updateTagConfiguration.input";
import {LoadValueTagConfigurationInput} from "../input/loadTagConfiguration.input";

@Resolver(() => TagConfigurationInterface)
@UsePipes(new ValidationPipe())
export class TagConfigurationResolver {
    constructor(protected readonly tagService: TagConfigurationService) {}

    @ResolveField(() => [TaggableEntities])
    applyTo(@Parent() config: TagConfiguration): TaggableEntities[] {
        return config.taggableEntities
    }

    @Query(returns => TagConfigurationInterface)
    getTagConfiguration(@Args('id') id: number): TagConfiguration {
        return this.tagService.getTagConfiguration(id)
    }

    @Query(returns => PaginatedConfig)
    getAllTagConfigurations(@Args() args: GetManyConfigurationsArgs): IPaginatedType<TagConfiguration>{
        return this.tagService.getAllTagConfigurationsPaginated(args)
    }

    @Mutation(returns => TagConfigurationInterface)
    createTagConfiguration(@Args('input') input: CreateTagConfigurationInput): TagConfiguration {
        return this.tagService.createTagConfiguration(input)
    }

    @Mutation(returns => TagConfigurationInterface)
    updateTagConfiguration(@Args('input') input: UpdateTagConfigurationInput): TagConfiguration {
        return this.tagService.updateTagConfiguration(input)
    }

    @Mutation(returns => TagConfigurationInterface)
    async loadValueTagConfiguration(@Args('input') input: LoadValueTagConfigurationInput): Promise<TagConfiguration> {
        return this.tagService.loadValueTagConfiguration(input)
    }
}
