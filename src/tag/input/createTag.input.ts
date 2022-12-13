import {Field, InputType, Int} from '@nestjs/graphql'

@InputType('CreateTagInput')
export class CreateTagInput{

    @Field(()=>Int)
    configurationId!: number
    //
    // @Field(() => ValueArrayConfigInput)
    // values!: ValueArrayConfigInput
}
