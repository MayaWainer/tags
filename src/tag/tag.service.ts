import {Injectable} from '@nestjs/common';
import {TagResourceInput } from "./input/tagResource.input";
import {TagConfigurationService} from "../tagConfiguration/tagConfiguration.service";
import {
    Configuration,
    NumberTagValidation, StringTagValidation,
    TagConfiguration,
    ValueListTagValidation
} from "../tagConfiguration/interface/tagConfiguration";
import {Entities, TagConfigurationType, TaggableEntities} from "../common/enum/tagType.enum";
import {Tag, TaggableEntity, TagValue} from "./interface/tag.interface";
import {RepositoryService} from "../mockData/repository.mock";

@Injectable()
export class TagService {
    constructor(private readonly tagConfigService: TagConfigurationService, private readonly taggableEntityRepo: RepositoryService<TaggableEntity>) {
    }

    tagResource(input: TagResourceInput): TaggableEntity {
        const entityName = input.entity as unknown as Entities
        const entity = this.getEntity(entityName, input.entityId)
        const tagConfig = this.getTagConfiguration(input.configurationId)
        const tagIndex = entity.tags.findIndex((tag)=> tag.configurationId === tagConfig.id)
        const tag = tagIndex >= 0 ? entity.tags[tagIndex] :
            { name: tagConfig.name, configurationId: tagConfig.id, values: []}
        tag.values = this.updateTagValues(tag.values, input, tagConfig)
        return this.upsertTag(entityName, entity, tag, tagIndex)
    }

    private upsertTag(entityName: Entities, entity: TaggableEntity, updatedTag: Tag, originalTagIndex: number): TaggableEntity{
        if(originalTagIndex === -1) entity.tags.push(updatedTag)
        else if (updatedTag.values.length > 0) entity.tags[originalTagIndex] = updatedTag
        else {
            console.log('all tag values where deleted, removing tag')
            entity.tags.splice(originalTagIndex, 1)
        }
        return this.taggableEntityRepo.update(entityName, entity.id, entity)
    }

    private updateTagValues(values: TagValue[], input: TagResourceInput,tagConfig: TagConfiguration): TagValue[] {
        this.validateIfEntityAllowed(input.entity, tagConfig.taggableEntities)
        const { addValues, removeValues } = input
        const valueSet = new Set(values)
        if(addValues)
            this.addValidatedTagValues(addValues, valueSet, tagConfig)
        if(removeValues)
            removeValues.map((value)=> valueSet.delete(value))
        this.validateValueCount(valueSet.size, tagConfig.allowMultiple)
        return Array.from(valueSet)
    }

    private validateIfEntityAllowed(entity: TaggableEntities, allowedEntities: TaggableEntities[]): void {
        if(!allowedEntities.includes(entity)) throw new Error('tag does not allow this entity')
    }

    private addValidatedTagValues(addValues: TagValue[], valueSet: Set<TagValue>, tagConfig: TagConfiguration) {
        const valueValidationFunc = this.getValidationFunctionFromType(tagConfig.type)
        addValues.map((value)=> {
            valueValidationFunc(value, tagConfig)
            valueSet.add(value)
        })
    }

    private getEntity(entity: Entities, id: number): TaggableEntity {
        const entityObj = this.taggableEntityRepo.getOne(entity, 'id', id)
        if(!entityObj) throw new Error('entity not found')
        return entityObj
    }

    private getTagConfiguration(id: number): TagConfiguration {
        const tagConfig = this.tagConfigService.getTagConfiguration(id)
        if(!tagConfig) throw new Error(`couldn't find tag configuration`)
        return tagConfig
    }

    private validateValueCount(valueCount: number, allowMultiple: boolean): void {
        if(!allowMultiple && valueCount > 1) throw new Error('tag can only have one value')
    }

    private validateNumberValue(value: string, config: Configuration & NumberTagValidation): void {
        let number = Number(value)
        if((config.min && number < config.min) || (config.max && number > config.max))
            throw new Error(`number ${value} is not in range`)
    }

    private validateStringValue(value: string, config: Configuration & StringTagValidation): void {
        if(config.charCount && value.length > config.charCount)
            throw new Error(`value ${value} is too long`)
    }

    private validateValueInList(value: string, config: Configuration & ValueListTagValidation): void {
        if(!config.valueList.includes(value)) throw new Error(`value ${value} is not allowed`)
    }

    private getValidationFunctionFromType(type: TagConfigurationType): Function {
        switch (type){
            case TagConfigurationType.Number: return this.validateNumberValue
            case TagConfigurationType.String: return this.validateStringValue
            case TagConfigurationType.ValueList: return this.validateValueInList
        }
    }
}
