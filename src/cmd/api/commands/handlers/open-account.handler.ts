import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountAggregate } from '../../../domain/aggregator/account.aggregator';
import { OpenAccountCommand } from '../impl/open-account.command';

@CommandHandler(OpenAccountCommand)
export class OpenAccountHandler implements ICommandHandler<OpenAccountCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  public async execute(command: OpenAccountCommand) {
    console.log('OpenAccountHandler/execute');

    const aggregate: AccountAggregate = this.publisher.mergeObjectContext(new AccountAggregate(command.id));

    aggregate.openAccount(command);
    aggregate.commit();
  }
}
