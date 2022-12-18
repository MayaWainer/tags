import {ObjectType} from '@nestjs/graphql'
import {Paginated} from "../../common/pagination/paginated";

@ObjectType()
export class PaginatedValueList extends Paginated<string>(String) {}
