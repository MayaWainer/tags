import {TagConfiguration} from "../../tagConfiguration/interface/tagConfiguration";
import {TagConfigurationType, TaggableEntities} from "../../common/enum/tagType.enum";

export const mockTagConfigurations : TagConfiguration[] = [
    {
        id: 1,
        name: 'trip name',
        companyId: 1,
        type: TagConfigurationType.ValueList,
        valueList: ['spain', 'romania', 'israel', 'england'],
        allowMultiple: false,
        taggableEntities: [TaggableEntities.Expense, TaggableEntities.Card]
    },
    {
        id: 2,
        name: 'subscription name',
        companyId: 1,
        type: TagConfigurationType.ValueList,
        valueList: ['aws','rav kav','ten bis','netflix','mondial khan 11'],
        allowMultiple: false,
        taggableEntities: [TaggableEntities.Expense, TaggableEntities.Card]
    },
    {
        id: 3,
        name: 'who took part in this meal expense without me TT',
        companyId: 1,
        type: TagConfigurationType.ValueList,
        valueList: ['tal', 'reut', 'mor', 'tamar', 'michal', 'maya', 'tzach?'],
        allowMultiple: true,
        taggableEntities: [TaggableEntities.Expense]
    }
]
