import {Injectable} from '@nestjs/common';
import {mockTagConfigurations} from "./mockData/tagConfigurations.mock";
import {CreateTagConfigurationInput} from "./input/createTagConfiguration.input";
import {TagType} from "../common/enum/tagType.enum";
import {ValueArrayTagValidation, TagConfiguration, TagValidation} from "./interface/tagConfiguration";
import {UpdateTagConfigurationInput} from "./input/updateTagConfiguration.input";

@Injectable()
export class TagConfigurationService {
    readonly tagConfigurations: TagConfiguration[]
    constructor() {
        this.tagConfigurations = mockTagConfigurations
    }

    getTagConfiguration(id: number): TagConfiguration {
        return this.tagConfigurations.find((t)=>t.id === id)
    }

    getAllTagConfigurations(): TagConfiguration[] {
        return this.tagConfigurations
    }

    createTagConfiguration(config: CreateTagConfigurationInput): TagConfiguration {
        let tagValidation: TagValidation
        if(config.type === TagType.ValueArray)
            tagValidation = {
                values: config.valueArrayConfig.values
            }
        const nextId = this.tagConfigurations.length+1
        const newTagConfig = {
            id: nextId,
            name: config.name,
            type: config.type,
            validation: tagValidation
        }
        this.tagConfigurations.push(newTagConfig)
        return newTagConfig
    }

    updateTagConfiguration(input: UpdateTagConfigurationInput): TagConfiguration {
        const configIndex = this.tagConfigurations.findIndex((c)=>c.id === input.id)
        if(!configIndex) throw new Error('configuration does not exist')

        const newConfig = this.tagConfigurations[configIndex]
        if(input.name) newConfig.name = input.name
        if(input.valueArrayConfig  && "values" in newConfig.validation)
           newConfig.validation.values = input.valueArrayConfig.values
        this.tagConfigurations[configIndex] = newConfig
        return newConfig
    }
}
