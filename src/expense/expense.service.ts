import { Injectable } from '@nestjs/common';
import {ExpenseDto} from "./dto/expense.dto";

@Injectable()
export class ExpenseService {
    async get(): Promise<ExpenseDto> {
        return {
            id: 1,
            amountInCardCurrency: 10,
            conversionRate: 1,
            merchantName: 'merchant name',
            createdAt: '01-01-2020'
        }
    }
}
