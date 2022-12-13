import {TagType} from "../../common/enum/tagType.enum";
import {TagConfiguration} from "../interface/tagConfiguration";

export const mockTagConfigurations : TagConfiguration[] = [
    {
        id: 1,
        name: 'trip name',
        type: TagType.ValueArray,
        validation: {
            values: ['spain', 'romania', 'israel', 'england']
        }
    },
    {
        id: 2,
        name: 'subscription name',
        type: TagType.ValueArray,
        validation: {
            values: ['aws','rav kav','ten bis','netflix','mondial khan 11']
        }
    },
    {
        id: 3,
        name: 'who took part in this meal expense without me TT',
        type: TagType.ValueArray,
        validation: {
            values: ['tal', 'reut', 'mor', 'tamar', 'michal', 'maya', 'tzach?']
        }
    }
]
