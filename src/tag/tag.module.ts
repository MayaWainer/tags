import { Module } from '@nestjs/common';
import {TagService} from "./tag.service";
import {TagConfigurationModule} from "../tagConfiguration/tagConfiguration.module";
import {TaggableResolver} from "./resolvers/taggable.resolver";
import {RepositoryModuleMock} from "../mockData/repository.module.mock";
import {TagResolver} from "./resolvers/tag.resolver";

@Module({
    imports: [TagConfigurationModule, RepositoryModuleMock],
    providers: [TaggableResolver,TagResolver, TagService],
    exports: [TagService]
})
export class TagModule {}
