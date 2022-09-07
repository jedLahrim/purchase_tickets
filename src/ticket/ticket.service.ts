import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketDto } from './dto/ticket.dto';
import { User } from '../auth/entities/user.entity';
import { TicketFilterDto } from './dto/filter.dto';
import { Event } from '../event/entities/event.entity';
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRep: Repository<Ticket>,
  ) {}

  async createTicket(
    ticketDto: TicketDto,
    user: User,
    event: Event,
  ): Promise<Ticket> {
    const {
      ticket_name,
      ticket_created_at,
      available_count,
      ticket_updated_at,
    } = ticketDto;

    const ticket = this.ticketRep.create({
      ticket_name,
      ticket_created_at,
      available_count,
      ticket_updated_at,
      user,
      event,
    });
    await this.ticketRep.save(ticket);
    return ticket;
  }

  // getAll Tickets
  findAll(filterDto: TicketFilterDto, user: User) {
    const tick = this.getTicket(filterDto, user);
    console.log(tick);
    return tick;
  }

  //Filtering Tickets
  async getTicket(
    filterDto: TicketFilterDto,
    user: User,
    // event: Event,
  ): Promise<Ticket[]> {
    const { search } = filterDto;

    const query = this.ticketRep.createQueryBuilder('ticket');
    query.where({ user });
    // query.where({ event });

    if (search) {
      query.andWhere(
        '(LOWER(ticket.ticket_name) LIKE LOWER(:search) OR LOWER(ticket.ticket_created_at) LIKE LOWER(:search) OR LOWER(ticket.ticket_updated_at) LIKE LOWER(:search)) ' +
          'OR LOWER(ticket.available_count) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const ticket = await query.getMany();
      return ticket;
    } catch (error) {
      error(
        `Failed to get ticket for user "${
          user.email
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      // error(
      //   `Failed to get ticket for event "${
      //     event.event_name
      //   }". Filters: ${JSON.stringify(filterDto)}`,
      //   error.stack,
      // );
      throw new InternalServerErrorException();
    }
  }
  async getTicketById(id: string, user: User | any): Promise<Ticket> {
    const found = await this.ticketRep.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  // Paginated Tickets
  async paginate(options: IPaginationOptions): Promise<Pagination<Ticket>> {
    const queryBuilder = this.ticketRep.createQueryBuilder('t');
    queryBuilder.orderBy('t.ticket_name', 'DESC'); // Or whatever you need to do

    return  paginate<Ticket>(queryBuilder, options);
  }

  // update ticket name
  async updateTicket(
    id: string,
    ticket_name: string,
    user: User | any,
  ): Promise<Ticket> {
    const ticket = await this.getTicketById(id, user);
    ticket.ticket_name = ticket_name;
    await this.ticketRep.save(ticket);
    return ticket;
  }

  //delete ticket
  async deleteTicket(id: string, user: User | any): Promise<void> {
    const result = await this.ticketRep.delete({ id, user });
console.log(result)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
