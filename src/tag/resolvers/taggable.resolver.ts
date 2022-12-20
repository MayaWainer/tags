import {Resolver, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql';
import {TagService} from "../tag.service";
import {TaggableDto} from "../dto/taggable.dto";
import {TagDto} from "../dto/tag.dto";
import {Tag, TaggableEntity} from "../interface/tag.interface";
import {TagResourceInput} from "../input/tagResource.input";
import {TaggedEntityDto} from "../dto/taggedEntity.dto";
import {UpdateTagInput} from "../input/updateTag.input";
import {RemoveTagInput} from "../input/removeTag.input";

@Resolver(() => TaggableDto)
export class TaggableResolver {
    constructor(protected readonly tagService: TagService) {}

    @ResolveField(() => [TagDto])
    tags(@Parent() object: TaggableEntity): Tag[] {
        if(object.tags.length === 0) return null
        return object.tags
    }

    @Mutation(() => TaggedEntityDto)
    tagResource(@Args('input') input: TagResourceInput): TaggableEntity {
        return this.tagService.tagResource(input)
    }

    @Mutation(() => TaggedEntityDto)
    updateTag(@Args('input') input: UpdateTagInput): TaggableEntity {
        return this.tagService.updateTagInDB(input)
    }

    @Mutation(() => TaggedEntityDto)
    removeTag(@Args('input') input: RemoveTagInput): TaggableEntity {
        return this.tagService.removeTag(input)
    }
}
