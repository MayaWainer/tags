import {Field, Int, InterfaceType, ObjectType} from '@nestjs/graphql'
import {TagDto} from "./tag.dto";
import {Tag} from "../interface/tag.interface";

@InterfaceType('Taggable')
export abstract class TaggableDto {

    @Field(() => Int)
    id!: number

    @Field(() => [TagDto])
    tags!: Tag[]
}
