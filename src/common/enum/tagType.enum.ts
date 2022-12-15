import { registerEnumType } from '@nestjs/graphql'

export enum TagConfigurationType {
    ValueList = 'ValueList',
    Number = 'Number',
    String = 'String'
}
registerEnumType(TagConfigurationType, { name: 'TagConfigurationType' })

export enum TaggableEntities {
    Expense = 'Expense',
    Card = 'Card'
}
registerEnumType(TaggableEntities, { name: 'TaggableEntities' })

export enum Entities {
    Expense = 'Expense',
    Card = 'Card',
    TagConfiguration = 'TagConfiguration'
}

