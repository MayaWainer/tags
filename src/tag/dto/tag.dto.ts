import {Field, Int, ObjectType} from '@nestjs/graphql'
import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";
import {TagConfigurationInterface} from "../../tagConfiguration/dto/tagConfiguration.interface";

@ObjectType('Tag')
export class TagDto {
    //TODO: IDK why we need ID for each TAG as TAG is just a plain text
    @Field(() => Int)
    id!: number

    @Field(() => TagConfigurationInterface)
    tagConfiguration!: TagConfiguration

    @Field(() => [String])
    values!: string[]
}

const projectNames = ['a','b','c','d']
const employeeName = ['tal','maya','reut', 'c']


const expense = {
    amount: 6,
    tags: [
        {name: 'projectNames', value: 'b'},
        {name: 'employeeName',value: 'c', tagConfig: employeeName}
    ]
}
