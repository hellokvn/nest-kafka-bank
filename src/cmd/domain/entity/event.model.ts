import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'eventStore' })
export class EventModel {
  @ObjectIdColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public timeStamp: Date;

  @Column()
  public aggregateIdentifier: string;

  @Column()
  public aggregateType: string;

  @Column()
  public eventType: string;

  @Column()
  public eventData: any;

  @Column()
  public version: number;
}
