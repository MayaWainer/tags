import {Expense} from "../../expense/interface/expense.interface";

export const mockExpenses : Expense[] = [
    {
        id: 1,
        companyId: 1,
        amountInCardCurrency: 10,
        conversionRate: 1,
        merchantName: 'merchant name',
        createdAt: '01-01-2020',
        tags: [{
            name: 'trip name',
            configurationId: 1,
            values: ['spain']
        }]
    },
    {
        id: 2,
        companyId: 1,
        amountInCardCurrency: 12,
        conversionRate: 10,
        merchantName: 'name2',
        createdAt: '01-02-2020',
        tags: [{
            name: 'subscription name',
            configurationId: 2,
            values: ['rav kav']
        }]
    },
    {
        id: 3,
        companyId: 1,
        amountInCardCurrency: 15,
        conversionRate: 0.5,
        merchantName: 'name3',
        createdAt: '01-05-2020',
        tags: [{
            name: 'who took part in this meal expense without me TT',
            configurationId: 3,
            values: ['tamar','reut']
        }]
    }
]
