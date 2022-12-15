import { Module } from '@nestjs/common';
import {RepositoryService} from "./repository.mock";

@Module({
    providers: [RepositoryService],
    exports: [RepositoryService]
})
export class RepositoryModuleMock {}
