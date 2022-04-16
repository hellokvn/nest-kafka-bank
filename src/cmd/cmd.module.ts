import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './api/controller/open-account.controller';
import { EventModel } from './domain/entity/event.model';
import { EventStoreRepository } from './domain/repository/event.repository';
import { AccountEventStoreHandler } from './infrastructure/handlers/account-store.handler';
import { OpenAccountHandler } from './api/commands/handlers/open-account.handler';
import { AccountEventProducer } from './infrastructure/producer/account-event.producer';
import { COMMAND_DATABASE_CONNECTION } from '@/common/constants/database.constants';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot({
      name: COMMAND_DATABASE_CONNECTION,
      type: 'mongodb',
      url: 'mongodb://localhost:27017/bankAccount',
      entities: [EventModel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EventStoreRepository], COMMAND_DATABASE_CONNECTION),
  ],
  controllers: [AccountController],
  providers: [OpenAccountHandler, AccountEventStoreHandler, AccountEventProducer],
})
export class CmdModule {}
