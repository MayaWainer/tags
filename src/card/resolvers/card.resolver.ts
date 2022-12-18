import { Args, Query, Resolver} from '@nestjs/graphql';
import {TaggableResolver} from "../../tag/resolvers/taggable.resolver";
import {TagService} from "../../tag/tag.service";
import {CardDto} from "../dto/card.dto";
import {CardService} from "../card.service";
import {Card} from "../interface/card.interface";
import {IPaginatedType} from "../../common/pagination/paginated";
import {GetManyCardsArgs} from "../dto/args/getMany.args";
import {PaginatedCards} from "../dto/cards.paginated";

@Resolver(() => CardDto)
export class CardResolver extends TaggableResolver{
    constructor(private readonly cardService: CardService, readonly tagService: TagService) {
        super(tagService)
    }

    @Query(returns => CardDto)
    getCard(@Args('id') id: number): Card {
        return this.cardService.get(id)
    }

    @Query(returns => PaginatedCards)
    getAllCardsPaginated(@Args() args: GetManyCardsArgs): IPaginatedType<Card>{
        return this.cardService.getAllCardsPaginated(args)
    }
}
