import {Injectable} from '@nestjs/common';
import {CreateTagConfigurationInput} from "./input/createTagConfiguration.input";
import {Entities, TagConfigurationType} from "../common/enum/tagType.enum";
import {TagConfiguration, TagValidation} from "./interface/tagConfiguration";
import {RepositoryService} from "../mockData/repository.mock";

@Injectable()
export class TagConfigurationService {
    constructor(private readonly configRepo: RepositoryService<TagConfiguration>) {}

    getTagConfiguration(id: number): TagConfiguration {
        return this.configRepo.getOne(Entities.TagConfiguration, id)
    }

    getAllTagConfigurations(): TagConfiguration[] {
        return this.configRepo.getAll(Entities.TagConfiguration)
    }

    createTagConfiguration(config: CreateTagConfigurationInput): TagConfiguration {
        let tagValidation: TagValidation
        if(config.type === TagConfigurationType.ValueList && config.valueListTagConfig)
            tagValidation = {
            type: TagConfigurationType.ValueList,
            valueList: config.valueListTagConfig.values
            }
        if(config.type === TagConfigurationType.Number && config.numberTagConfig)
            tagValidation = {
                type: TagConfigurationType.Number,
                max: config.numberTagConfig.max,
                min: config.numberTagConfig.min
            }
        if(config.type === TagConfigurationType.String && config.stringTagConfig)
            tagValidation = {
                type: TagConfigurationType.String,
                charCount: config.stringTagConfig.charCount
            }
        const nextId = this.configRepo.getNextId(Entities.TagConfiguration)
        const newTagConfig: TagConfiguration= {
            id: nextId,
            name: config.name,
            allowMultipleValues: config.allowMultipleValues,
            taggableEntities: config.taggableEntities,
            ...tagValidation
        }
        return this.configRepo.create(Entities.TagConfiguration, newTagConfig)
    }

    // updateTagConfiguration(input: UpdateTagConfigurationInput): TagConfiguration {
    //     const configIndex = this.tagConfigurations.findIndex((c)=>c.id === input.id)
    //     if(!configIndex) throw new Error('configuration does not exist')
    //
    //     const newConfig = this.tagConfigurations[configIndex]
    //     if(input.name) newConfig.name = input.name
    //     if(input.valueArrayConfig  && "values" in newConfig.validation)
    //        newConfig.validation.values = input.valueArrayConfig.values
    //     this.tagConfigurations[configIndex] = newConfig
    //     return newConfig
    // }
}
