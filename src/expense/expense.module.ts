import { Module } from '@nestjs/common';
import {ExpenseService} from "./expense.service";
import {ExpenseResolver} from "./resolvers/expense.resolver";
import {TagModule} from "../tag/tag.module";
import {RepositoryModuleMock} from "../mockData/repository.module.mock";
import {TagConfigurationModule} from "../tagConfiguration/tagConfiguration.module";
import {ExportService} from "./export";

@Module({
    imports: [TagModule, RepositoryModuleMock, TagConfigurationModule],
    providers: [ExpenseService, ExportService, ExpenseResolver],
})
export class ExpenseModule {}
