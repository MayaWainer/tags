import { ObjectType} from '@nestjs/graphql'
import {Paginated} from "../../common/pagination/paginated";
import {CardDto} from "./card.dto";


@ObjectType()
export class PaginatedCards extends Paginated<CardDto>(CardDto) {}
