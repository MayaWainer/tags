import { PaginationInput } from './pagination.input'

export interface FindManyPaginatedArgs {
    pagination?: PaginationInput
    sorting?: any
    filter?: any
}
