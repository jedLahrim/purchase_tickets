import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "./entities/ticket.entity";

@Injectable()
export class TicketService {
  constructor(@InjectRepository(Ticket)
              private tasksRepo: Repository<Ticket>
  ) {
  }
  //
  // findAll(ticketDto: TicketD, user: User) {
  //   return this.getTasks(filterDto, user);
  // }
}
