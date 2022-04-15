import { OnModuleInit, Injectable, Controller } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Client, Transport, ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AccountConsumer implements OnModuleInit {
  @Client({
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
  })
  public client: ClientKafka;

  constructor(private eventHandler: EventEmitter2) {}

  public async onModuleInit() {
    this.client.subscribeToResponseOf('test-topicc');
    await this.client.connect();
  }

  @MessagePattern('test-topicc')
  public consume(@Payload() payload: any): any {
    this.eventHandler.emit('AccountOpenedEvent', payload.value);
  }
}
