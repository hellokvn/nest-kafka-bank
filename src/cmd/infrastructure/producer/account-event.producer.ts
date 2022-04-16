import { Injectable } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { AccountOpenedEvent } from '../../../common/events/account-opened.event';

export interface EventProducer {
  produce(topic: string, event: AccountOpenedEvent): void;
}

@Injectable()
export class AccountEventProducer implements EventProducer {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'my-app2',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    this.producer.connect();
  }

  public produce<T>(topic: string, event: T): void {
    console.log('AccountEventProducer/produce', topic);
    this.producer.send({ topic: 'test-topicc', messages: [{ value: JSON.stringify(event) }] });
  }
}
