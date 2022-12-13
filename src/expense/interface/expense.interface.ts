import {TaggableObject} from "../../tag/interface/taggable.interface";

export interface Expense extends TaggableObject{
    id: number
    amountInCardCurrency: number
    conversionRate: number
    merchantName: string
    createdAt: string
}
