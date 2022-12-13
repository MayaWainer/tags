import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import {TagService} from "../tag.service";
import {TaggableDto} from "../dto/taggable.dto";
import {TagDto} from "../dto/tag.dto";
import {Tag} from "../interface/tag.interface";
import {TaggableObject} from "../interface/taggable.interface";

@Resolver(() => TaggableDto)
export class TaggableResolver {
    constructor(protected readonly tagService: TagService) {}

    @ResolveField(() => [TagDto])
    tags(@Parent() object: TaggableObject): Tag[] {
        return this.tagService.getManyTags({ids: object.tags})
    }
}
