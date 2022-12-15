import { Module } from '@nestjs/common';
import {TagConfigurationService} from "./tagConfiguration.service";
import {TagConfigurationResolver} from "./resolvers/tagConfiguration.resolver";
import {ValueListTagConfigurationResolver} from "./resolvers/valueListTagConfiguration.resolver";
import {RepositoryModuleMock} from "../mockData/repository.module.mock";

@Module({
    imports: [RepositoryModuleMock],
    providers: [TagConfigurationService, TagConfigurationResolver, ValueListTagConfigurationResolver],
    exports: [TagConfigurationService]
})
export class TagConfigurationModule {}
