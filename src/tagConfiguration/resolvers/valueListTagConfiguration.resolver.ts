import {Args, Parent, ResolveField, Resolver} from '@nestjs/graphql';
import {ValueListConfigurationDto} from "../dto/TypeConfiguration/valueListTagConfiguration.dto";
import {TagConfigurationResolver} from "./tagConfiguration.resolver";
import {TagConfigurationService} from "../tagConfiguration.service";
import {TagConfiguration} from "../interface/tagConfiguration";
import {TagConfigurationType} from "../../common/enum/tagType.enum";
import {ValueListArgs} from "../dto/valueList.args";

@Resolver(() => ValueListConfigurationDto)
export class ValueListTagConfigurationResolver extends TagConfigurationResolver{
    constructor(readonly tagService: TagConfigurationService) {
        super(tagService)
    }

    @ResolveField(() => [String])
    valueList(@Args() args: ValueListArgs, @Parent() config: TagConfiguration): string[] {
        if(config.type === TagConfigurationType.ValueList)
        {
            const start = args.valueListPagination.offset
            const end = args.valueListPagination.offset + args.valueListPagination.limit
            return config.valueList.slice(start,end)
        }
    }
}
