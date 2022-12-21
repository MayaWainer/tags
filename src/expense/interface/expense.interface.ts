import {TaggableEntity} from "../../tag/interface/tag.interface";

export interface Expense extends TaggableEntity{
    id: number
    companyId: number
    amountInCardCurrency: number
    conversionRate: number
    merchantName: string
    createdAt: string
}
