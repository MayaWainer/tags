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
import {UpdateTagInput} from "./input/updateTag.input";
import {RemoveTagInput} from "./input/removeTag.input";

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

    private updateTagValues(values: TagValue[], input: UpdateTagInput,tagConfig: TagConfiguration): TagValue[] {
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
        // return valueSet
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

    // tagResource(input: TagResourceInput): TaggableEntity {
    //     const entity = input.entity as unknown as Entities
    //     const entityObj = this.taggableEntityRepo.getOne(entity, 'id', input.entityId)
    //     if(!entityObj) throw new Error('entity not found')
    //     const tagConfig = this.tagConfigService.getTagConfiguration(input.configurationId)
    //     if(!tagConfig) throw new Error(`couldn't find tag configuration`)
    //
    //     if(this.tagAlreadyExists(entityObj, input.configurationId)) throw new Error('entity is already tagged by this configuration')
    //     // this.validateTag(tagConfig, input)
    //     let newTag: Tag = {
    //         name: tagConfig.name,
    //         configurationId: tagConfig.id,
    //         values: this.getValidatedValues(tagConfig, input) // input.values
    //     }
    //     entityObj.tags.push(newTag)
    //     return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    // }
    //
    // updateTagInDB(input: UpdateTagInput): TaggableEntity {
    //
    //
    //     return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    // }
    //
    // removeTag(input: RemoveTagInput): TaggableEntity {
    //     const entity = input.entity as unknown as Entities
    //     const entityObj = this.taggableEntityRepo.getOne(entity, 'id', input.entityId)
    //     const index = entityObj.tags.findIndex(t => t.configurationId === input.configurationId)
    //     if(index === -1) throw new Error('entity is not tagged by this configuration')
    //     entityObj.tags.splice(index, 1)
    //     return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    // }
    //
    // private tagAlreadyExists(entity: TaggableEntity, configurationId: number): boolean {
    //     return entity.tags.some(t => t.configurationId === configurationId)
    // }
    //
    // private getValidatedValues(tagConfig: TagConfiguration, input: TagResourceInput): TagValue[] {
    //     this.validateIfEntityAllowed(input.entity, tagConfig.taggableEntities)
    //     this.validateValueCount(input.values, tagConfig.allowMultiple)
    //     // const validationFunc = this.getValidationFunctionFromType(tagConfig.type)
    //     // input.values.map(v => validationFunc(v, tagConfig))
    //     return this.addTagValues(input.values, [], tagConfig)
    // }
    //
    // private updateTagValues(values: TagValue[], input: UpdateTagInput,tagConfig: TagConfiguration): TagValue[] {
    //     if(input.addValues?.length > 0)
    //         values = this.addTagValues(input.addValues, values, tagConfig)
    //     if(input.removeValues?.length > 0)
    //         values = this.removeTagValues(input.removeValues, values)
    //     this.validateValueCount(values, tagConfig.allowMultiple)
    //     return values
    // }
    //
    // private validateIfEntityAllowed(entity: TaggableEntities, allowedEntities: TaggableEntities[]): void {
    //     console.log(allowedEntities, entity)
    //     if(!allowedEntities.includes(entity)) throw new Error('tag does not allow this entity')
    // }
    //
    // private removeTagValues(removeValues: TagValue[], valuesArr: TagValue[]): TagValue[] {
    //     removeValues.map(v => {
    //         const index = valuesArr.indexOf(v)
    //         if(index === -1) console.warn('value does not exist', { value: v })
    //         valuesArr.splice(index, 1)
    //     })
    //     return valuesArr
    // }
    //
    // private addTagValues(addValues: TagValue[], valuesArr: TagValue[], tagConfig: TagConfiguration): TagValue[] {
    //     const valueValidationFunc = this.getValidationFunctionFromType(tagConfig.type)
    //     addValues.map(v => {
    //         valueValidationFunc(v, tagConfig)
    //         valuesArr.indexOf(v) === -1 ? valuesArr.push(v): console.warn('duplicate value', { value: v })
    //     })
    //     return valuesArr
    // }
    //
    private validateValueCount(valueCount: number, allowMultiple: boolean): void {
        // if(values.length === 0) throw new Error('tag must have a value')
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
