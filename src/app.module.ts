import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student.module';
import { ClassModule } from './modules/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Class } from './entities/class.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
   StudentModule, ClassModule,
   GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Automatically generates the schema
    playground: true, // Enables GraphQL Playground for testing queries
    introspection: true,
    debug: true, // Enable debug mode
    context: ({ req }) => ({ req })
  }),
   TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 54330,
    username: 'admin',
    password: 'admin',
    database: 'nest-postdb',
     entities: [Class, Student],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
