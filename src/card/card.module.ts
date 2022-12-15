import { Module } from '@nestjs/common';
import {TagModule} from "../tag/tag.module";
import {CardService} from "./card.service";
import {CardResolver} from "./resolvers/card.resolver";
import {RepositoryModuleMock} from "../mockData/repository.module.mock";

@Module({
    imports: [TagModule, RepositoryModuleMock],
    providers: [CardService, CardResolver],
})
export class CardModule {}
