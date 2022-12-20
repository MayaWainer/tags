import { Module } from '@nestjs/common';
import {ExpenseService} from "./expense.service";
import {ExpenseResolver} from "./resolvers/expense.resolver";
import {TagModule} from "../tag/tag.module";
import {RepositoryModuleMock} from "../mockData/repository.module.mock";
import {TagConfigurationModule} from "../tagConfiguration/tagConfiguration.module";

@Module({
    imports: [TagModule, RepositoryModuleMock, TagConfigurationModule],
    providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
