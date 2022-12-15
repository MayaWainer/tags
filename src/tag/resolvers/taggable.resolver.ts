import {Resolver, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql';
import {TagService} from "../tag.service";
import {TaggableDto} from "../dto/taggable.dto";
import {TagDto} from "../dto/tag.dto";
import {Tag, TaggableEntity} from "../interface/tag.interface";
import {UpsertTagInput} from "../input/upsertTag.input";
import {TaggedEntityDto} from "../dto/taggedEntity.dto";

@Resolver(() => TaggableDto)
export class TaggableResolver {
    constructor(protected readonly tagService: TagService) {}

    @ResolveField(() => [TagDto])
    tags(@Parent() object: TaggableEntity): Tag[] {
        return object.tags
    }

    @Mutation(() => TaggedEntityDto)
    upsertTag(@Args('input') input: UpsertTagInput): TaggableEntity {
        return this.tagService.upsertTag(input)
    }
}
