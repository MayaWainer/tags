import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType('Tag')
export class TagDto {
    @Field()
    name!: string

    @Field()
    configurationId!: number

    @Field(() => [String])
    values!: string[]
}
