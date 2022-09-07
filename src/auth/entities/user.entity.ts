import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../../ticket/entities/ticket.entity';
import { Event } from '../../event/entities/event.entity';
// import { IsOptional } from "class-validator";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  phone_number: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  profile_picture: string;
  @OneToMany((_type) => Ticket, (ticket) => ticket.user, {
    eager: true,
  })
  ticket: Ticket[];

  @OneToMany((_type) => Event, (event) => event.user, {
    eager: true,
  })
  event: Event[];
}
