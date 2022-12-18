import { InputType } from '@nestjs/graphql'
import {SortInput} from "../../../../common/pagination/sort";
import {CardSortKey} from "../../../../common/enum/sort.enum";

@InputType()
export class CardSort extends SortInput(CardSortKey) {}
