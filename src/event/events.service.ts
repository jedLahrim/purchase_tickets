import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { EventDto } from './dto/events.dto';
import { User } from '../auth/entities/user.entity';
import { EventFilterDto } from './dto/filter.dto';
import { Ticket } from '../ticket/entities/ticket.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    // private jwtService: JwtService,
  ) {}

  async createEvent(eventDto: EventDto, user: User): Promise<Event> {
    const {
      event_name,
      event_created_at,
      event_address,
      event_updated_at,
      event_end_date,
    } = eventDto;

    const event = this.eventRepo.create({
      event_name,
      event_created_at,
      event_address,
      event_updated_at,
      event_end_date,
      user,
    });
    await this.eventRepo.save(event);
    return event;
  }

  findAll(filterDto: EventFilterDto, user: User) {
    const event = this.getEvent(filterDto, user);
    return event;
  }

  //Filtering Tickets
  async getEvent(filterDto: EventFilterDto, user: User): Promise<Event[]> {
    const { search } = filterDto;

    const query = this.eventRepo.createQueryBuilder('event');
    query.where({ user });

    if (search) {
      query.andWhere(
        '(LOWER(event.event_name) LIKE LOWER(:search) OR LOWER(event.event_address) LIKE LOWER(:search) OR LOWER(event.event_created_at) LIKE LOWER(:search)) ' +
          'OR LOWER(event.event_end_date) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const event = await query.getMany();
      return event;
    } catch (error) {
      error(
        `Failed to get event for user "${
          user.email
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Event>> {
    const queryBuilder = this.eventRepo.createQueryBuilder('e');
    queryBuilder.orderBy('e.event_name', 'DESC'); // Or whatever you need to do

    return paginate<Event>(queryBuilder, options);
  }

  async getTicketByEvent(
    event_name: string,
    user: User | any,
    ticket: Ticket | any,
  ): Promise<Event> {
    const found = await this.eventRepo.findOne({
      where: { event_name, user, ticket },
    });
    if (!found) {
      throw new NotFoundException(
        `Ticket with event name "${event_name}" not found`,
      );
    }
    return found;
  }
  async getEventById(id: string, user: User | any): Promise<Event> {
    const found = await this.eventRepo.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async updateEvent(
    id: string,
    event_name: string,
    user: User | any,
  ): Promise<Event> {
    const event = await this.getEventById(id, user);
    event.event_name = event_name;
    await this.eventRepo.save(event);
    return event;
  }

  async deleteEvent(id: string, user: User | any): Promise<void> {
    const result = await this.eventRepo.delete({ id, user });
    console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  // async JwtAccess(eventDto: EventDto): Promise<{ accessToken }> {
  //   const { event_name } = eventDto;
  //   await this.eventRepo.findOne({ where: { event_name } });
  //   const payload:jwtPayload = {event_name};
  //   const accessToken: string = this.jwtService.sign(payload);
  //   return { accessToken };
  // }
}
