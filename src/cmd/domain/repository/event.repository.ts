import { EntityRepository, MongoRepository } from 'typeorm';
import { EventModel } from '../entity/event.model';

@EntityRepository(EventModel)
export class EventStoreRepository extends MongoRepository<EventModel> {
  public async findByAggregateIdentifier(aggregateIdentifier: string): Promise<EventModel[]> {
    return this.find({ where: { aggregateIdentifier } });
  }
}
