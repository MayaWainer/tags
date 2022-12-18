import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {ValueListConfigurationDto} from "../dto/TypeConfiguration/valueListTagConfiguration.dto";
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {ValueListArgs} from "../dto/args/valueList.args";
import {PaginatedValueList} from "../dto/valueList.paginated";
import {IPaginatedType} from "../../common/pagination/paginated";
import {paginateStringArray} from "../../common/paginationFuncs";

@Resolver(() => ValueListConfigurationDto)
export class ValueListTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField(() => PaginatedValueList)
    valueList(@Args() args: ValueListArgs, @Parent() config: TagConfiguration): IPaginatedType<string> {
        if(config.type === TagConfigurationType.ValueList)
        {
            return paginateStringArray(config.valueList, args)
        }
    }
}
