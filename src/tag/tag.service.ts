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
        const entity = input.entity as unknown as Entities
        const entityObj = this.taggableEntityRepo.getOne(entity, 'id', input.entityId)
        if(this.tagAlreadyExists(entityObj, input.configurationId)) throw new Error('entity is already tagged by this configuration')
        const tagConfig = this.tagConfigService.getTagConfiguration(input.configurationId)
        // this.validateTag(tagConfig, input)
        let newTag: Tag = {
            name: tagConfig.name,
            configurationId: tagConfig.id,
            values: this.getValidatedValues(tagConfig, input) // input.values
        }
        entityObj.tags.push(newTag)
        return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    }

    updateTagInDB(input: UpdateTagInput): TaggableEntity {
        const entity = input.entity as unknown as Entities
        const entityObj = this.taggableEntityRepo.getOne(entity, 'id', input.entityId)
        const index = entityObj.tags.findIndex(t => t.configurationId === input.configurationId)
        if(index === -1) throw new Error('entity is not tagged by this configuration')

        const tagConfig = this.tagConfigService.getTagConfiguration(input.configurationId)
        entityObj.tags[index].values = this.updateTagValues(entityObj.tags[index].values, input, tagConfig)
        // if(input.addValues?.length > 0)
        //     entityObj.tags[index].values = this.addTagValues(input.addValues, entityObj.tags[index].values, tagConfig)
        // if(input.removeValues?.length > 0)
        //     entityObj.tags[index].values = this.removeTagValues(input.removeValues, entityObj.tags[index].values)
        // this.validateValueCount(entityObj.tags[index].values, tagConfig.allowMultiple)
        return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    }

    removeTag(input: RemoveTagInput): TaggableEntity {
        const entity = input.entity as unknown as Entities
        const entityObj = this.taggableEntityRepo.getOne(entity, 'id', input.entityId)
        const index = entityObj.tags.findIndex(t => t.configurationId === input.configurationId)
        if(index === -1) throw new Error('entity is not tagged by this configuration')
        entityObj.tags.splice(index, 1)
        return this.taggableEntityRepo.update(entity, input.entityId, entityObj)
    }

    private tagAlreadyExists(entity: TaggableEntity, configurationId: number): boolean {
        return entity.tags.some(t => t.configurationId === configurationId)
    }

    private getValidatedValues(tagConfig: TagConfiguration, input: TagResourceInput): TagValue[] {
        this.validateIfEntityAllowed(input.entity, tagConfig.taggableEntities)
        this.validateValueCount(input.values, tagConfig.allowMultiple)
        // const validationFunc = this.getValidationFunctionFromType(tagConfig.type)
        // input.values.map(v => validationFunc(v, tagConfig))
        return this.addTagValues(input.values, [], tagConfig)
    }

    private updateTagValues(values: TagValue[], input: UpdateTagInput,tagConfig: TagConfiguration): TagValue[] {
        if(input.addValues?.length > 0)
            values = this.addTagValues(input.addValues, values, tagConfig)
        if(input.removeValues?.length > 0)
            values = this.removeTagValues(input.removeValues, values)
        this.validateValueCount(values, tagConfig.allowMultiple)
        return values
    }

    private validateIfEntityAllowed(entity: TaggableEntities, allowedEntities: TaggableEntities[]): void {
        console.log(allowedEntities, entity)
        if(!allowedEntities.includes(entity)) throw new Error('tag does not allow this entity')
    }

    private removeTagValues(removeValues: TagValue[], valuesArr: TagValue[]): TagValue[] {
        removeValues.map(v => {
            const index = valuesArr.indexOf(v)
            if(index === -1) console.warn('value does not exist', { value: v })
            valuesArr.splice(index, 1)
        })
        return valuesArr
    }

    private addTagValues(addValues: TagValue[], valuesArr: TagValue[], tagConfig: TagConfiguration): TagValue[] {
        const valueValidationFunc = this.getValidationFunctionFromType(tagConfig.type)
        addValues.map(v => {
            valueValidationFunc(v, tagConfig)
            valuesArr.indexOf(v) === -1 ? valuesArr.push(v): console.warn('duplicate value', { value: v })
        })
        return valuesArr
    }

    private validateValueCount(values: TagValue[], allowMultiple: boolean): void {
        if(values.length === 0) throw new Error('tag must have a value')
        if(!allowMultiple && values.length > 1) throw new Error('tag can only have one value')
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
