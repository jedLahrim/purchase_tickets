import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Ticket } from "../ticket/entities/ticket.entity";
import { Repository } from "typeorm";
import { Event } from "./entities/event.entity";
import { EventDto } from "./dto/events.dto";

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event)
              private tasksRepo: Repository<Event>
  ) {
  }

  // findAll(eventDto: EventDto, user: User) {
  //   return this.getTasks(filterDto, user);
  // }
}
