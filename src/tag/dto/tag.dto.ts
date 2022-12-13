import {Field, Int, ObjectType} from '@nestjs/graphql'
import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";
import {TagConfigurationInterface} from "../../tagConfiguration/dto/tagConfiguration.interface";

@ObjectType('Tag')
export class TagDto {
    @Field(() => Int)
    id!: number

    @Field(() => TagConfigurationInterface)
    tagConfiguration!: TagConfiguration

    @Field(() => [String])
    values!: string[]
}
