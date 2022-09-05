import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_name: string;

  @Column()
  event_address: string;

  @Column()
  event_created_at: Date;

  @Column()
  event_updated_at: Date;

  @Column()
  event_end_date: string;
}