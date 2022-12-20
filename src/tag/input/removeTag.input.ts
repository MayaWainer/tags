import {Field, InputType, Int} from '@nestjs/graphql'
import {TaggableEntities} from "../../common/enum/tagType.enum";

@InputType('RemoveTagInput')
export class RemoveTagInput {

    @Field(()=>Int)
    configurationId!: number

    @Field(() => TaggableEntities)
    entity!: TaggableEntities

    @Field()
    entityId!: number
}
