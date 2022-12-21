import {Injectable} from '@nestjs/common';
import {CreateTagConfigurationInput} from "./input/createTagConfiguration.input";
import {Entities, TagConfigurationType} from "../common/enum/tagType.enum";
import {TagConfiguration, TagValidation} from "./interface/tagConfiguration";
import {RepositoryService} from "../mockData/repository.mock";
import {GetManyConfigurationsArgs} from "./dto/args/getMany.args";
import {paginateResults} from "../common/paginationFuncs";
import {IPaginatedType} from "../common/pagination/paginated";
import {UpdateTagConfigurationInput} from "./input/updateTagConfiguration.input";

@Injectable()
export class TagConfigurationService {
    constructor(private readonly configRepo: RepositoryService<TagConfiguration>) {}

    getTagConfiguration(id: number): TagConfiguration {
        return this.configRepo.getOne(Entities.TagConfiguration,'id', id)
    }

    getAllTagConfigurationsPaginated(args: GetManyConfigurationsArgs): IPaginatedType<TagConfiguration> {
        let configs = this.configRepo.getAll(Entities.TagConfiguration)
        return paginateResults(configs, args)
    }

    createTagConfiguration(config: CreateTagConfigurationInput): TagConfiguration {
        let alreadyExist = this.configRepo.getOne(Entities.TagConfiguration, 'name', config.name)
        if(alreadyExist) throw new Error('a tag already exists with this name')
        let tagValidation = this.createTagValidation(config)
        const nextId = this.configRepo.getNextId(Entities.TagConfiguration)
        const newTagConfig: TagConfiguration= {
            id: nextId,
            name: config.name,
            companyId: 1,
            allowMultiple: config.allowMultiple,
            taggableEntities: config.taggableEntities,
            ...tagValidation
        }
        return this.configRepo.create(Entities.TagConfiguration, newTagConfig)
    }

    // loadTagConfiguration(config: CreateTagConfigurationInput): any {
    //     let alreadyExist = this.configRepo.getOne(Entities.TagConfiguration, 'name', config.name)
    //     if(alreadyExist) throw new Error('a tag already exists with this name')
    //     // let tagValidation = this.createTagValidation(config)
    //     // const nextId = this.configRepo.getNextId(Entities.TagConfiguration)
    //     // const newTagConfig: TagConfiguration= {
    //     //     id: nextId,
    //     //     name: config.name,
    //     //     companyId: 1,
    //     //     allowMultiple: config.allowMultiple,
    //     //     taggableEntities: config.taggableEntities,
    //     //     ...tagValidation
    //     // }
    //     // return this.configRepo.create(Entities.TagConfiguration, newTagConfig)
    // }

    updateTagConfiguration(input: UpdateTagConfigurationInput): TagConfiguration {
        let config = this.configRepo.getOne(Entities.TagConfiguration, 'id', input.id)
        if(!config) throw new Error('could not find tag configuration')
        if(typeof input.allowMultiple === 'boolean') config.allowMultiple = input.allowMultiple
        if(input.taggableEntities && input.taggableEntities.length > 0) config.taggableEntities = input.taggableEntities
        if(input.stringTagConfig && config.type === TagConfigurationType.String)
            config.charCount = input.stringTagConfig.charCount
        if(input.numberTagConfig && config.type === TagConfigurationType.Number)
        {
            config.min = input.numberTagConfig.min
            config.max = input.numberTagConfig.max
        }
        if(input.valueListTagConfig && config.type === TagConfigurationType.ValueList)
        {
            config.valueList = this.updateValueList(config.valueList, input.valueListTagConfig.addValues, input.valueListTagConfig.removeValues)
        }
        return this.configRepo.update(Entities.TagConfiguration, config.id, config)
    }

    private updateValueList(valueList: string[], addValues?: string[], removeValues?: string[]): string[]{
        if(addValues) addValues.map(v => {
            valueList.indexOf(v) === -1 ? valueList.push(v) : console.warn("value already exists", {value: v})
        })
        if(removeValues) removeValues.map(v => {
            let index = valueList.indexOf(v)
            index > -1 ? valueList.splice(index, 1) : console.warn("cant remove value that does not exist", {value: v})
        })
        return valueList
    }

    private createTagValidation(config: CreateTagConfigurationInput): TagValidation{
        switch (config.type) {
            case TagConfigurationType.Number: return this.numberTagValidation(config)
            case TagConfigurationType.String: return this.stringTagValidation(config)
            case TagConfigurationType.ValueList: return this.valueListTagValidation(config)
        }
    }

    private numberTagValidation(config: CreateTagConfigurationInput): TagValidation{
        if(!config.numberTagConfig) throw new Error('missing tag configuration input for Number tag')
         return {
            type: TagConfigurationType.Number,
             max: config.numberTagConfig.max,
             min: config.numberTagConfig.min
        }
    }

    private valueListTagValidation(config: CreateTagConfigurationInput): TagValidation{
        if(!config.valueListTagConfig) throw new Error('missing tag configuration input for valueList tag')
        if(config.valueListTagConfig.values.length === 0) throw new Error('missing tag configuration input for valueList tag')
        return {
            type: TagConfigurationType.ValueList,
            valueList: config.valueListTagConfig.values
        }
    }

    private stringTagValidation(config: CreateTagConfigurationInput): TagValidation{
        if(!config.stringTagConfig) throw new Error('missing tag configuration input for String tag')
        return {
            type: TagConfigurationType.String,
            charCount: config.stringTagConfig.charCount
        }
    }
}
