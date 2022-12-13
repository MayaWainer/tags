import { Injectable } from '@nestjs/common';
import { mockTags} from "./mockData/tags.mock";
import {FindManyTags} from "./input/findManyTags.input";
import {Tag} from "./interface/tag.interface";

@Injectable()
export class TagService {
    readonly tags: Tag[]
    constructor() {
        this.tags = mockTags
    }

    getTag(id: number): Tag {
        return this.tags.find((t)=>t.id === id)
    }

    getManyTags(input: FindManyTags): Tag[] {
        const tags = input.ids.map((id)=> {
            return this.tags.find((t) => t.id === id)
        })
        return tags
    }

    getAllTag(): Tag[] {
        return this.tags
    }

    // createTag(config: CreateTagConfigurationInput): Tag {
    //     let tagValidation: TagValidation
    //     if(config.type === TagType.ValueArray)
    //         tagValidation = {
    //             values: config.valueArrayConfig.values
    //         }
    //     const nextId = this.tagConfigurations.length+1
    //     const newTagConfig = {
    //         id: nextId,
    //         name: config.name,
    //         type: config.type,
    //         validation: tagValidation
    //     }
    //     this.tagConfigurations.push(newTagConfig)
    //     return newTagConfig
    // }

    // updateTag(input: UpdateTagConfigurationInput): TagConfiguration {
    //     const configIndex = this.tagConfigurations.findIndex((c)=>c.id === input.id)
    //     if(!configIndex) throw new Error('configuration does not exist')
    //
    //     const newConfig = this.tagConfigurations[configIndex]
    //     if(input.name) newConfig.name = input.name
    //     if(input.valueArrayConfig  && "values" in newConfig.validation)
    //         newConfig.validation.values = input.valueArrayConfig.values
    //     this.tagConfigurations[configIndex] = newConfig
    //     return newConfig
    // }
}
