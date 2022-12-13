import { Injectable } from '@nestjs/common';
import {mockExpenses} from "./mockData/expenses.mock";
import {Expense} from "./interface/expense.interface";

@Injectable()
export class ExpenseService {
    readonly expenses: Expense[]
    constructor() {
        this.expenses = mockExpenses
    }

    get(id: number): Expense {
        return this.expenses.find((e)=> e.id === id)
    }

    getAll(): Expense[] {
        return this.expenses
    }
}
