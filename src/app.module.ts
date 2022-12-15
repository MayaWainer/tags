import { Module } from '@nestjs/common';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {ExpenseModule} from "./expense/expense.module";
import { join } from 'path'
import {TagModule} from "./tag/tag.module";
import {TagConfigurationModule} from "./tagConfiguration/tagConfiguration.module";
import {CardModule} from "./card/card.module";
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import {RepositoryModuleMock} from "./mockData/repository.module.mock";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver, autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          plugins: [
              ApolloServerPluginLandingPageLocalDefault()
          ],
          playground: false, // use the newer sandbox ("ApolloServerPluginLandingPageLocalDefault" plugin)
      }),
      ExpenseModule,
      CardModule,
      TagModule,
      TagConfigurationModule,
      RepositoryModuleMock
  ]
})
export class AppModule {}
