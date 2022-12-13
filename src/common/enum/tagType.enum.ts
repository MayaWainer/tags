import { registerEnumType } from '@nestjs/graphql'


// TODO: Every tagCOnfigurationType should have a "multiple" version (multiple enum(s), multiple numbers, multiple emails etc...)
export enum TagConfigurationType {
    ValueArray = 'ValueArray',
    Number = 'Number'
}
registerEnumType(TagConfigurationType, { name: 'TagType' })
