import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";

export interface configuration{
    id: number
    name: string
    allowMultiple: boolean
    taggableEntities: TaggableEntities[]
}

export type TagConfiguration = configuration & TagValidation

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
