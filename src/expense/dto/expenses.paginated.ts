import { ObjectType} from '@nestjs/graphql'
import {Paginated} from "../../common/pagination/paginated";
import {ExpenseDto} from "./expense.dto";


@ObjectType()
export class PaginatedExpenses extends Paginated<ExpenseDto>(ExpenseDto) {}
