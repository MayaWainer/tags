import { registerEnumType } from '@nestjs/graphql'

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}
registerEnumType(SortDirection, { name: 'SortDirection' })

//sortKeys

export enum ConfigSortKey {
    id = 'id'
}
registerEnumType(ConfigSortKey, { name: 'ConfigSortKey' })

export enum ExpenseSortKey {
    id = 'id'
}
registerEnumType(ExpenseSortKey, { name: 'ExpenseSortKey' })

export enum CardSortKey {
    id = 'id'
}
registerEnumType(CardSortKey, { name: 'CardSortKey' })
