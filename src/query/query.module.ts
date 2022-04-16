import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './api/controller/account.controller';
import { QUERY_DATABASE_CONNECTION } from '../common/constants/database.constants';
import { AccountConsumer } from './infrastructure/consumers/account.consumer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccountHandler } from './infrastructure/handlers/account.handler';
import { AccountRepository } from './domain/repository/account.repository';
import { Account } from './domain/entity/account.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AllAccountsHandler } from './api/queries/handlers/all-accounts.handler';

@Module({
  imports: [
    CqrsModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      name: QUERY_DATABASE_CONNECTION,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'kevin',
      database: 'account',
      entities: [Account],
      synchronize: false,
    }),
    ClientsModule.register([
      {
        name: 'HERO_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'my-app2',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test-group',
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([AccountRepository], QUERY_DATABASE_CONNECTION),
  ],
  controllers: [AccountController, AccountConsumer],
  providers: [AccountHandler, AllAccountsHandler],
})
export class QueryModule {}
