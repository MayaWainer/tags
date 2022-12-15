import {Injectable} from '@nestjs/common';
import {Expense} from "./interface/expense.interface";
import {RepositoryService} from "../mockData/repository.mock";
import {Entities} from "../common/enum/tagType.enum";

@Injectable()
export class ExpenseService {
    constructor(private readonly ExpenseRepo: RepositoryService<Expense>) {}

    get(id: number): Expense {
        return this.ExpenseRepo.getOne(Entities.Expense, id)
    }

    getAll(): Expense[] {
        return this.ExpenseRepo.getAll(Entities.Expense)
    }
}
