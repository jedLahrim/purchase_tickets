import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Exclude } from 'class-transformer';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
  event_end_date: Date;

  @OneToMany((_type) => Ticket, (ticket) => ticket.event, {
    eager: true,
  })
  ticket: Ticket[];

  @ManyToOne((_type) => User, (user) => user.event, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
