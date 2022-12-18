import {Field, ObjectType} from '@nestjs/graphql'
import {TagConfigurationInterface} from "../../tagConfiguration/dto/tagConfiguration.interface";

@ObjectType('Tag')
export class TagDto {
    @Field()
    name!: string

    @Field(()=> TagConfigurationInterface)
    configuration!: TagConfigurationInterface

    @Field(() => [String])
    values!: string[]
}
