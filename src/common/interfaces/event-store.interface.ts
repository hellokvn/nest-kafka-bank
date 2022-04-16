import { BaseEvent } from '../events/base.event';

export interface EventStore {
  saveEvents(aggregateId: string, events: BaseEvent[], expectedVersion: number): void;
  getEvents(aggregateId: string): BaseEvent[];
}
