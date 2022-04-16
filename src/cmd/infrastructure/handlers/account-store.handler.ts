import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AccountOpenedEvent } from '../../../common/events/account-opened.event';
import { InjectRepository } from '@nestjs/typeorm';
import { EventStoreRepository } from '../../domain/repository/event.repository';
import { Inject } from '@nestjs/common';
import { AccountEventProducer } from '../producer/account-event.producer';
import { EventModel } from '../../domain/entity/event.model';
import { COMMAND_DATABASE_CONNECTION } from '@/common/constants/database.constants';

@EventsHandler(AccountOpenedEvent)
export class AccountEventStoreHandler implements IEventHandler<AccountOpenedEvent> {
  @InjectRepository(EventStoreRepository, COMMAND_DATABASE_CONNECTION)
  private eventStoreRepository: EventStoreRepository;

  @Inject(AccountEventProducer)
  private eventProducer: AccountEventProducer;

  public async handle<T>(event: T) {
    console.log('AccountOpenedHandler/handle');
    // const eventStream: EventModel[] = await this.eventStoreRepository.findByAggregateIdentifier('1');

    // console.log('OpenAccountHandler/execute OpenAccountCommand');

    const eventModel: EventModel = new EventModel();
    eventModel.aggregateIdentifier = '1';
    eventModel.aggregateType = 'AccountAggregate';
    eventModel.eventType = 'AccountOpenedEvent';
    eventModel.version = 0;
    eventModel.eventData = event;
    await this.eventStoreRepository.save(eventModel);

    const { constructor } = Object.getPrototypeOf(event);
    this.eventProducer.produce(constructor.name, event);
  }
}
