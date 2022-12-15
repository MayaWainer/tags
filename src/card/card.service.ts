import { Injectable } from '@nestjs/common';
import {Card} from "./interface/card.interface";
import {RepositoryService} from "../mockData/repository.mock";
import {Entities} from "../common/enum/tagType.enum";

@Injectable()
export class CardService {
    constructor(private readonly cardRepo: RepositoryService<Card>) {}

    get(id: number): Card {
        return this.cardRepo.getOne(Entities.Card, id)
    }

    getAll(): Card[] {
        return this.cardRepo.getAll(Entities.Card)
    }
}
