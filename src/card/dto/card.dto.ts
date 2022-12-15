import { Field, Int, ObjectType } from '@nestjs/graphql'
import {TaggableDto} from "../../tag/dto/taggable.dto"
import {Tag} from "../../tag/interface/tag.interface";
import {TagDto} from "../../tag/dto/tag.dto";

@ObjectType('Card', {
    implements: () => [TaggableDto]
})
export class CardDto implements TaggableDto {
    @Field(() => Int)
    id!: number

    @Field()
    nameOnCard!: string

    @Field(() => [TagDto])
    tags!: Tag[]
}
