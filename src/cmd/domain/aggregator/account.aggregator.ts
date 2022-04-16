import { AggregateRoot } from '@nestjs/cqrs';
import { AccountOpenedEvent } from '../../../common/events/account-opened.event';
import { OpenAccountCommand } from '../../api/commands/impl/open-account.command';
import { DepositFundCommand } from '../../api/commands/impl/deposit-funds.command';
import { FundsDepositedEvent } from '../../../common/events/deposit-funds.event';

export class AccountAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public openAccount(command: OpenAccountCommand) {
    // logic
    this.apply(new AccountOpenedEvent(command));
  }

  public depositFunds(command: DepositFundCommand) {
    // logic
    this.apply(new FundsDepositedEvent(command));
  }
}
