import {Injectable} from '@nestjs/common';
import {TagResourceInput } from "./input/upsertTag.input";
import {TagConfigurationService} from "../tagConfiguration/tagConfiguration.service";
import {TagConfiguration} from "../tagConfiguration/interface/tagConfiguration";
import {Entities, TagConfigurationType, TaggableEntities} from "../common/enum/tagType.enum";
import {Tag, TaggableEntity} from "./interface/tag.interface";
import {RepositoryService} from "../mockData/repository.mock";

@Injectable()
export class TagService {
    constructor(private readonly tagConfigService: TagConfigurationService, private readonly taggableEntityRepo: RepositoryService<TaggableEntity>) {
    }

    tagResource(input: TagResourceInput): TaggableEntity {
        const tagConfig = this.tagConfigService.getTagConfiguration(input.configurationId)
        this.validateTagValues(tagConfig, input.values, input.entity)
        let tag: Tag = {
            name: tagConfig.name,
            configurationId: tagConfig.id,
            values: input.values
        }
        return this.upsertTagInDB(input.entity as unknown as Entities, input.entityId, tag)
    }

    upsertTagInDB(entity: Entities, entityId: number, newTag: Tag): TaggableEntity {
        const taggableEntity = this.taggableEntityRepo.getOne(entity, entityId)
        const index = taggableEntity.tags.findIndex((tag)=> tag.configurationId === newTag.configurationId)
        if(index >= 0) taggableEntity.tags[index] = newTag
        else taggableEntity.tags.push(newTag)
        return this.taggableEntityRepo.update(entity, entityId, taggableEntity)
    }

    private validateTagValues(tagConfig: TagConfiguration, values: string[], entity: TaggableEntities): void {
        if(!tagConfig.taggableEntities.includes(entity))
            throw new Error('tag does not allow this entity')
        if(!tagConfig.allowMultiple && values.length > 1)
            throw new Error('tag can only have one value')
        values.map((value)=> {
            if(tagConfig.type === TagConfigurationType.ValueList) this.validateValueInList(value, tagConfig.valueList)
            if(tagConfig.type === TagConfigurationType.String)  this.validateStringLength(value, tagConfig.charCount)
            if(tagConfig.type === TagConfigurationType.Number) this.validateNumberInRange(Number(value), tagConfig.min, tagConfig.max)
        })
    }

    private validateValueInList(value: string, list: string[]): void {
        if(!list.includes(value)) throw new Error(`value ${value} is too long`)
    }

    private validateStringLength(string: string, charCount: number): void {
        if(string.length > charCount) throw new Error(`string ${string} is too long`)
    }

    private validateNumberInRange(number: number, min: number, max: number): void {
        if(number < min || number > max) throw new Error(`number ${number} is not in range`)
    }
}
