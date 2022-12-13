import { Module } from '@nestjs/common';
import {ExpenseService} from "./expense.service";
import {ExpenseResolver} from "./resolvers/expense.resolver";
import {TagModule} from "../tag/tag.module";

@Module({
    imports: [TagModule],
    providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
