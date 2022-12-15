import {createUnionType, Field, ObjectType} from "@nestjs/graphql";
import {ExpenseDto} from "../../expense/dto/expense.dto";
import {CardDto} from "../../card/dto/card.dto";

export const TaggedEntityDto = createUnionType({
    name: 'TaggedEntity',
    types: () => [ExpenseDto, CardDto] as const,
    resolveType(value){
        if(value.nameOnCard) return CardDto
        else return ExpenseDto
    }
});

