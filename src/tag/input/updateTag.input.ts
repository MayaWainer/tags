import {Field, InputType, Int} from '@nestjs/graphql'
import {TaggableEntities} from "../../common/enum/tagType.enum";

@InputType('UpdateTagInput')
export class UpdateTagInput {

    @Field(()=>Int)
    configurationId!: number

    @Field(() => [String], {nullable: true})
    addValues?: string[]

    @Field(() => [String], {nullable: true})
    removeValues?: string[]

    @Field(() => TaggableEntities)
    entity!: TaggableEntities

    @Field()
    entityId!: number
}
