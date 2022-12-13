import {TagConfigurationType} from "../../common/enum/tagType.enum";

export interface TagConfiguration {
    id: number
    name: string
    type: TagConfigurationType
    validation: TagValidation
}

export type TagValidation = ValueArrayTagValidation | NumberTagValidation

export interface ValueArrayTagValidation {
    values: string[]
}

export interface NumberTagValidation {
    min: number
    max: number
}
