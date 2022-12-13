import { Module } from '@nestjs/common';
import {TagConfigurationService} from "./tagConfiguration.service";
import {TagConfigurationResolver} from "./resolvers/tagConfiguration.resolver";
import {ValueArrayTagConfigurationResolver} from "./resolvers/valueArrayTagConfiguration.resolver";

@Module({
    providers: [TagConfigurationService, TagConfigurationResolver, ValueArrayTagConfigurationResolver],
    exports: [TagConfigurationService]
})
export class TagConfigurationModule {}
