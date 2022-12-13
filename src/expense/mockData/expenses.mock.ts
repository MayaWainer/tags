import {Expense} from "../interface/expense.interface";

export const mockExpenses : Expense[] = [
    {
        id: 1,
        amountInCardCurrency: 10,
        conversionRate: 1,
        merchantName: 'merchant name',
        createdAt: '01-01-2020',
        tags: [1]
    },
    {
        id: 2,
        amountInCardCurrency: 12,
        conversionRate: 10,
        merchantName: 'name2',
        createdAt: '01-02-2020',
        tags: [2]
    },
    {
        id: 3,
        amountInCardCurrency: 15,
        conversionRate: 0.5,
        merchantName: 'name3',
        createdAt: '01-05-2020',
        tags: [2,3]
    }
]
