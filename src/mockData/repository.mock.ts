import {Injectable} from '@nestjs/common';
import {Expense} from "../expense/interface/expense.interface";
import {Card} from "../card/interface/card.interface";
import {mockExpenses} from "./data/expenses.mock";
import {mockCards} from "./data/cards.mock";
import {TagConfiguration} from "../tagConfiguration/interface/tagConfiguration";
import {Entities} from "../common/enum/tagType.enum";
import {mockTagConfigurations} from "./data/tagConfigurations.mock";

export type repository = expensesRepository | cardsRepository | tagConfigurationRepository

export type expensesRepository = Record<Entities.Expense, Expense[]>
export type cardsRepository = Record<Entities.Card, Card[]>
export type tagConfigurationRepository = Record<Entities.TagConfiguration, TagConfiguration[]>

@Injectable()
export class RepositoryService<E> {
    readonly repository: repository
    constructor() {
        this.repository = {
                [Entities.Expense]: mockExpenses,
                [Entities.Card]: mockCards,
                [Entities.TagConfiguration]: mockTagConfigurations,
            }
    }

    getOne(entity: Entities, key: string, value: any): E{
        return this.repository[entity].find((e)=>e[key] === value)
    }

    getAll(entity: Entities): E[]{
        return this.repository[entity]
    }

    create(entity: Entities, newEntity: E): E{
        this.repository[entity].push(newEntity)
        return newEntity
    }

    getNextId(entity: Entities): number {
        return this.repository[entity].length +1
    }

    update(entity: Entities, id: number, newEntity: E): E {
        const index = this.repository[entity].findIndex((e)=> e.id === id)
        this.repository[entity][index]= newEntity
        return newEntity
    }
}
