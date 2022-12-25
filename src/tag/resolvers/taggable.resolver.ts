import {Resolver, ResolveField, Parent, Mutation, Args} from '@nestjs/graphql';
import {TagService} from "../tag.service";
import {TaggableDto} from "../dto/taggable.dto";
import {TagDto} from "../dto/tag.dto";
import {Tag, TaggableEntity} from "../interface/tag.interface";
import {TagResourceInput} from "../input/tagResource.input";
import {TaggedEntityDto} from "../dto/taggedEntity.dto";

@Resolver(() => TaggableDto)
export class TaggableResolver {
    constructor(protected readonly tagService: TagService) {}

    @ResolveField(() => [TagDto])
    tags(@Parent() object: TaggableEntity): Tag[] {
        return object.tags
    }

    @Mutation(() => TaggedEntityDto)
    tagResource(@Args('input') input: TagResourceInput): TaggableEntity {
        return this.tagService.tagResource(input)
    }
}
