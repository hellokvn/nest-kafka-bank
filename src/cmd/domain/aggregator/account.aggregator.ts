import { AggregateRoot } from '@nestjs/cqrs';
import { AccountOpenedEvent } from '../../../common/events/account-opened.event';
import { OpenAccountCommand } from '../../api/commands/impl/open-account.command';

export class AccountAggregate extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  public openAccount(command: OpenAccountCommand) {
    // logic
    this.apply(new AccountOpenedEvent(command));
  }
}
