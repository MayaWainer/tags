export interface Tag {
    id: number
    configurationId: number
    values: TagValue[]
}

export type TagValue = string | number
