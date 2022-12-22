export interface TaggableEntity {
    id: number
    tags: Tag[]
}

export interface Tag {
    name: string
    configurationId: number
    values: TagValue[]
}

export type TagValue = string | number
