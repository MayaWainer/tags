import {TaggableEntity} from "../../tag/interface/tag.interface";

export interface Card extends TaggableEntity{
    id: number
    nameOnCard: string
}
