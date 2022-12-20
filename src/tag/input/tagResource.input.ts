import {Field, InputType, Int} from '@nestjs/graphql'
import {TaggableEntities} from "../../common/enum/tagType.enum";

@InputType('TagResourceInput')
export class TagResourceInput {

    @Field(()=>Int)
    configurationId!: number

    @Field(() => [String])
    values!: string[]

    @Field(() => TaggableEntities)
    entity!: TaggableEntities

    @Field()
    entityId!: number
}
