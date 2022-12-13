import {Field, InterfaceType, ObjectType} from '@nestjs/graphql'
import {TagDto} from "./tag.dto";
import {Tag} from "../interface/tag.interface";

@InterfaceType('Taggable')
export abstract class TaggableDto {

    @Field(() => [TagDto])
    tags!: Tag[]
}
