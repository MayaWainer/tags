import {Field, InputType, Int} from '@nestjs/graphql'

@InputType('FindManyTags')
export class FindManyTags{
    @Field(()=> [Int])
    ids!: number[]
}
