import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { User } from "../../auth/entities/user.entity";
import { Event } from "../../event/entities/event.entity";
import { IsOptional } from "class-validator";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  ticket_name: string;

  @Column()
  available_count: string;

  @Column()
  ticket_created_at: Date;

  @Column()
  ticket_updated_at: Date;


  @ManyToOne((_type) => User, (user) => user.ticket, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne((_type) => Event, (event) => event.ticket, { eager: false })
  @Exclude({ toPlainOnly: true })
  event: Event;
}
