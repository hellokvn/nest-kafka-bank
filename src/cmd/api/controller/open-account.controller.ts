import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenAccountCommand } from '../commands/impl/open-account.command';
import { OpenAccountDto } from '../dto/open-account.dto';

@Controller('/api/v1/open-account')
export class AccountController {
  constructor(
    private readonly commandBus: CommandBus, // private readonly queryBus: QueryBus,
  ) {}

  @Post()
  public async openAccount(@Body() payload: OpenAccountDto): Promise<any> {
    console.log('-----------------------------');
    console.log('AccountController/openAccount');
    const command: OpenAccountCommand = new OpenAccountCommand(payload);

    this.commandBus.execute(command);
  }
}

// POST OpenAccountController/openAccount
// AccountCommandDispatcher/send -> handle command
// AccountCommandHandler/handle OpenAccountCommand -> ES.save
// AccountAggregate -> create AccountOpenedEvent, send Event
// AccountEventSourcingHandler/save -> EventStore Save
// AccountEventStore/saveEvents -> save to MongoDB by Repo
// AccountEventProducer/produce -> send to Kafka
// -- MONGO DB SAVE
// -- KAFKA SEND
// OpenAccountResponse/OpenAccountResponse AFTER KAFKA
