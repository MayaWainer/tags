import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";

export const mockTagConfigurations : TagConfiguration[] = [
    {
        id: 1,
        name: 'trip name',
        type: TagConfigurationType.ValueList,
        valueList: ['spain', 'romania', 'israel', 'england'],
        allowMultipleValues: false,
        taggableEntities: [TaggableEntities.Expense, TaggableEntities.Card]
    },
    {
        id: 2,
        name: 'subscription name',
        type: TagConfigurationType.ValueList,
        valueList: ['aws','rav kav','ten bis','netflix','mondial khan 11'],
        allowMultipleValues: false,
        taggableEntities: [TaggableEntities.Expense, TaggableEntities.Card]
    },
    {
        id: 3,
        name: 'who took part in this meal expense without me TT',
        type: TagConfigurationType.ValueList,
        valueList: ['tal', 'reut', 'mor', 'tamar', 'michal', 'maya', 'tzach?'],
        allowMultipleValues: true,
        taggableEntities: [TaggableEntities.Expense]
    }
]
