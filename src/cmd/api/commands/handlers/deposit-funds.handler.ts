import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountAggregate } from '../../../domain/aggregator/account.aggregator';
import { DepositFundCommand } from '../impl/deposit-funds.command';

@CommandHandler(DepositFundCommand)
export class DepositFundsHandler implements ICommandHandler<DepositFundCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: DepositFundCommand) {
    console.log('DepositFundsHandler/execute');

    const aggregate: AccountAggregate = this.publisher.mergeObjectContext(new AccountAggregate(command.id));

    aggregate.depositFunds(command);
    aggregate.commit();
  }
}
