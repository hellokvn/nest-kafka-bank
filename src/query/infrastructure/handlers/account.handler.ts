import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from '../../domain/repository/account.repository';
import { QUERY_DATABASE_CONNECTION } from '../../../common/constants/database.constants';
import { Account } from '@/query/domain/entity/account.entity';

@Injectable()
export class AccountHandler {
  @InjectRepository(AccountRepository, QUERY_DATABASE_CONNECTION)
  private repository: AccountRepository;

  @OnEvent('AccountOpenedEvent')
  private handleOrderCreatedEvent(event: any): void {
    // handle and process "OrderCreatedEvent" event
    console.log(event);

    const account: Account = new Account();

    account.holder = event._accountHolder;
    account.type = event._accountType;
    account.balance = event._openingBalance;
    account.createdDate = event._createdDate;

    this.repository.save(account);
  }
}
