import { registerEnumType } from '@nestjs/graphql'

export enum TagType {
    ValueArray = 'ValueArray',
    Number = 'Number'
}
registerEnumType(TagType, { name: 'TagType' })
