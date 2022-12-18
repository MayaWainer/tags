import {ObjectType} from '@nestjs/graphql'
import {Paginated} from "../../common/pagination/paginated";
import {TagConfigurationInterface} from "./tagConfiguration.interface";

@ObjectType()
export class PaginatedConfig extends Paginated<TagConfigurationInterface>(TagConfigurationInterface) {}
