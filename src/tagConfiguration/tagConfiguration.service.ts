import {Injectable} from '@nestjs/common';
import {CreateTagConfigurationInput} from "./input/createTagConfiguration.input";
import {Entities, TagConfigurationType} from "../common/enum/tagType.enum";
import {TagConfiguration, TagValidation} from "./interface/tagConfiguration";
import {RepositoryService} from "../mockData/repository.mock";
import {ConfigSortKey, SortDirection} from "../common/enum/enum";
import {GetManyConfigurationsArgs} from "./dto/getAll.args";

@Injectable()
export class TagConfigurationService {
    constructor(private readonly configRepo: RepositoryService<TagConfiguration>) {}

    getTagConfiguration(id: number): TagConfiguration {
        return this.configRepo.getOne(Entities.TagConfiguration, id)
    }

    getAllTagConfigurationsPaginated(args: GetManyConfigurationsArgs): TagConfiguration[] {
        let configs = this.configRepo.getAll(Entities.TagConfiguration)
        if(args.filter && args.filter.ids) configs = this.getFilteredIds(configs,"id",args.filter.ids)
        if(args.sorting) configs = this.getSorted(configs, args.sorting.sortBy, args.sorting.sortDirection)
        if(args.pagination) configs = this.getPaginated(configs, args.pagination.offset, args.pagination.limit)
        return configs
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

    private getPaginated<E>(object: E[],offset: number, limit: number): E[]{
        return object.slice(offset,(limit + offset))
    }

    private getSorted<E>(object: E[],key: ConfigSortKey, direction: SortDirection): E[]{
        return object.sort((a, b) => {
            let sortFunc = 0
            if(typeof a[key] === "number") sortFunc = a[key] - b[key]
            if(a[key] < b[key]) sortFunc = -1
            if(a[key] > b[key]) sortFunc = 1
            if(direction === SortDirection.DESC) return -sortFunc
            return sortFunc
        })
    }

    private getFilteredIds<E>(object: E[], key: string, values: number[] ): E[]{
        return object.filter((o)=> values.includes(o[key]))
    }
}
