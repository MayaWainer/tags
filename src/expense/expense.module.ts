import { Module } from '@nestjs/common';
import {ExpenseService} from "./expense.service";
import {ExpenseResolver} from "./expense.resolver";

@Module({
    providers: [ExpenseService, ExpenseResolver],
})
export class ExpenseModule {}
