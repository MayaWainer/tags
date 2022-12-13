import { Field, Int, ObjectType } from '@nestjs/graphql'
import {TaggableDto} from "../../tag/dto/taggable.dto"
import {Tag} from "../../tag/interface/tag.interface";
import {TagDto} from "../../tag/dto/tag.dto";

@ObjectType('Expense', {
    implements: () => [TaggableDto]
})
export class ExpenseDto implements TaggableDto {
    @Field(() => Int)
    id!: number

    @Field()
    amountInCardCurrency!: number

    @Field()
    conversionRate!: number

    @Field()
    merchantName?: string

    @Field()
    createdAt!: string

    @Field(() => [TagDto])
    tags!: Tag[]
}
