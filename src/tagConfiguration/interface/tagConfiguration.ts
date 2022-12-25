import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";

export interface Configuration{
    id: number
    name: string
    companyId: number
    allowMultiple: boolean
    taggedValuesLimit?: number
    taggableEntities: TaggableEntities[]
}

export type TagConfiguration = Configuration & TagValidation

export type TagValidation = ValueListTagValidation | NumberTagValidation | StringTagValidation

export interface ValueListTagValidation {
    type: TagConfigurationType.ValueList
    valueList: string[]
}

export interface NumberTagValidation {
    type: TagConfigurationType.Number
    min?: number
    max?: number
}

export interface StringTagValidation {
    type: TagConfigurationType.String
    charCount?: number
}
