import {Injectable} from '@nestjs/common';
import {CreateTagConfigurationInput} from "./input/createTagConfiguration.input";
import {Entities, TagConfigurationType} from "../common/enum/tagType.enum";
import {TagConfiguration, TagValidation} from "./interface/tagConfiguration";
import {RepositoryService} from "../mockData/repository.mock";
import {GetManyConfigurationsArgs} from "./dto/args/getMany.args";
import {paginateResults} from "../common/paginationFuncs";
import {IPaginatedType} from "../common/pagination/paginated";
import {UpdateTagConfigurationInput} from "./input/updateTagConfiguration.input";
import {LoadValueTagConfigurationInput} from "./input/loadTagConfiguration.input";
import {FileUpload} from "graphql-upload";
import {parse} from "csv-parse";

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
            taggedValuesLimit: config.taggedValuesLimit,
            taggableEntities: config.taggableEntities,
            ...tagValidation
        }
        return this.configRepo.create(Entities.TagConfiguration, newTagConfig)
    }

    async loadValueTagConfiguration(config: LoadValueTagConfigurationInput): Promise<TagConfiguration> {
        let alreadyExist = this.configRepo.getOne(Entities.TagConfiguration, 'name', config.name)
        if(alreadyExist) throw new Error('a tag already exists with this name')
        const values = await this.getValuesFromFile(config.valuesFile)
        return this.createTagConfiguration({
            ...config,
            type: TagConfigurationType.ValueList,
            valueListTagConfig: {values}
        })
    }

    updateTagConfiguration(input: UpdateTagConfigurationInput): TagConfiguration {
        let config = this.configRepo.getOne(Entities.TagConfiguration, 'id', input.id)
        if(!config) throw new Error('could not find tag configuration')
        if(typeof input.allowMultiple === 'boolean') {
            config.allowMultiple = input.allowMultiple
            if(input.allowMultiple === true && input.taggedValuesLimit) config.taggedValuesLimit = input.taggedValuesLimit
        }
        if(input.taggableEntities) {
            if(input.taggableEntities.length === 0) throw new Error('tag configuration must be enforced on at least one taggable entity')
            config.taggableEntities = input.taggableEntities
        }
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

    private updateValueList(valueList: string[], addValues: string[], removeValues: string[]): string[]{
        let s = new Set(valueList)
        if(addValues) addValues.map(v => { s.add(v) })
        if(removeValues) removeValues.map(v => { s.delete(v) })
        return Array.from(s)
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
        if(config.valueListTagConfig.values.length === 0) throw new Error('tag configuration must include at least one value')
        const values = new Set(config.valueListTagConfig.values) // get only unique values
        return {
            type: TagConfigurationType.ValueList,
            valueList: Array.from(values)
        }
    }

    private stringTagValidation(config: CreateTagConfigurationInput): TagValidation{
        if(!config.stringTagConfig) throw new Error('missing tag configuration input for String tag')
        return {
            type: TagConfigurationType.String,
            charCount: config.stringTagConfig.charCount
        }
    }

    private async getValuesFromFile(file: FileUpload): Promise<string[]>{
        const fileInput = await file
        const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] // .csv .xls .xlsx
        if(!allowedMimeTypes.includes(fileInput.mimetype)) throw new Error(`mime type - ${fileInput.mimetype} is not supported`)
        const stream = fileInput.createReadStream()
        const values = []
        return new Promise((resolve, reject) => {
            stream.pipe(parse())
                .on("data", function (row) {
                    values.push(...row)
                })
                .on("error", function (error) {
                    console.log(error.message);
                    return reject(error.message)
                })
                .on("end", function () {
                    console.log("finished");
                    if(values.length === 0 ) return reject(`couldn't parse any values from file`)
                    return resolve(values)
                })
        })
    }
}
