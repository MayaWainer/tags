import { Module } from '@nestjs/common';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {ExpenseModule} from "./expense/expense.module";
import { join } from 'path'
import {TagModule} from "./tag/tag.module";
import {TagConfigurationModule} from "./tagConfiguration/tagConfiguration.module";
import {TaggableResolver} from "./tag/resolvers/taggable.resolver";

@Module({
  imports: [
      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, autoSchemaFile: join(process.cwd(), 'src/schema.gql')
      }),
      ExpenseModule,
      TagModule,
      TagConfigurationModule
  ],
    providers: [TaggableResolver]
})
export class AppModule {}
