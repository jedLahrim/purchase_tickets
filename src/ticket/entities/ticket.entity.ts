import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { User } from "../../auth/entities/user.entity";

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  ticket_name: string;

  @Column()
  ticket_address: string;

  @Column()
  ticket_created_at: Date;

  @Column()
  ticket_updated_at: Date;
  @ManyToMany(_type => User, user => user.ticket, { eager: false })
  @Exclude({toPlainOnly:true})
  user: User;
}