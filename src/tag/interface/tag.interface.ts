export interface TaggableEntity {
    id: number
    tags: Tag[]
}

export interface Tag {
    configurationId: number
    values: TagValue[]
}

export type TagValue = string | number
