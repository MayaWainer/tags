import {CardSortKey, ConfigSortKey, ExpenseSortKey, SortDirection} from "./enum/sort.enum";
import {IPaginatedType} from "./pagination/paginated";
import {FindManyPaginatedArgs} from "./pagination/pagination.args";
import {ValueListArgs} from "../tagConfiguration/dto/args/valueList.args";

export type SortKey = ExpenseSortKey | CardSortKey | ConfigSortKey

export const paginateResults = <E>( object: E[], args: FindManyPaginatedArgs): IPaginatedType<E> => {
    let paginated = object
    if(args.filter && args.filter.ids) paginated = filter(paginated, args.filter.ids, 'id')
    if(args.sorting) paginated = sort(paginated, args.sorting.sortDirection, args.sorting.sortBy as unknown as SortKey)
    if(args.pagination) paginated = paginate(paginated, args.pagination.offset, args.pagination.limit)
    return formatPaginatedResult(paginated)
}

export const paginateStringArray = ( object: string[], args: ValueListArgs): IPaginatedType<string> => {
    let paginated = object
    if(args.filter) paginated = filter(paginated, args.filter.values)
    if(args.sorting) paginated = sort(paginated, args.sorting.sortDirection)
    if(args.pagination) paginated = paginate(paginated, args.pagination.offset, args.pagination.limit)
    return formatPaginatedResult(paginated)
}

const formatPaginatedResult = <E>(paginated: E[]): IPaginatedType<E> => {
    return {
        items: paginated,
        metadata: { totalCount: paginated.length }
    }
}

const paginate = <E>(arr: E[], offset: number, limit: number): E[]=>{
    return arr.slice(offset,(limit + offset))
}

const sort = <E>(arr: E[], direction: SortDirection, key?: SortKey): E[]=>{
    return arr.sort((a, b) => {
        let valueA =  key? a[key] : a
        let valueB = key? b[key] : b
        let sortFunc = 0
        if(typeof valueA === "number" && typeof valueB === "number") sortFunc = valueA - valueB
        if(valueA < valueB) sortFunc = -1
        if(valueA > valueB) sortFunc = 1
        if(direction === SortDirection.DESC) return -sortFunc
        return sortFunc
    })
}

export const filter = <E>(arr: E[], values: any[], key?: string ): E[]=>{
    return arr.filter((o)=> {
        if (key) return values.includes(o[key])
        return values.includes(o)
    })
}
