import { Injectable } from '@nestjs/common';
import {Card} from "./interface/card.interface";
import {RepositoryService} from "../mockData/repository.mock";
import {Entities} from "../common/enum/tagType.enum";
import {IPaginatedType} from "../common/pagination/paginated";
import {paginateResults} from "../common/paginationFuncs";
import {GetManyCardsArgs} from "./dto/args/getMany.args";

@Injectable()
export class CardService {
    constructor(private readonly cardRepo: RepositoryService<Card>) {}

    get(id: number): Card {
        return this.cardRepo.getOne(Entities.Card, id)
    }

    getAllCardsPaginated(args: GetManyCardsArgs): IPaginatedType<Card> {
        let cards = this.cardRepo.getAll(Entities.Card)
        return paginateResults(cards, args)
    }
}
