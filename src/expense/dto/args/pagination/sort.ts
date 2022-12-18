import { InputType } from '@nestjs/graphql'
import {SortInput} from "../../../../common/pagination/sort";
import {ExpenseSortKey} from "../../../../common/enum/sort.enum";

@InputType()
export class ExpenseSort extends SortInput(ExpenseSortKey) {}
