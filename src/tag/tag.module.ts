import { Module } from '@nestjs/common';
import {TagResolver} from "./resolvers/tag.resolver";
import {TagService} from "./tag.service";
import {TagConfigurationModule} from "../tagConfiguration/tagConfiguration.module";
// import {TaggableResolver} from "./resolvers/taggable.resolver";

@Module({
    imports: [TagConfigurationModule],
    providers: [TagResolver, TagService],
    exports: [TagService]
})
export class TagModule {}
