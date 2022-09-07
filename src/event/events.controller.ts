import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  // Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { GetUser } from '../auth/getUser.Decorator';
import { User } from '../auth/entities/user.entity';
import { EventDto } from './dto/events.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventFilterDto } from './dto/filter.dto';
import { Event } from './entities/event.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('event')
@UseGuards(AuthGuard())
export class EventsController {
  constructor(private eventService: EventsService) {}
  @Post()
  create(@Body() eventDto: EventDto, @GetUser() user: User) {
    return this.eventService.createEvent(eventDto, user);
  }

  // @Post('/jwt')
  // JwtAccess(
  //   @Body()
  //   eventDto: EventDto,
  // ): Promise<{ accessToken }> {
  //   return this.eventService.JwtAccess(eventDto);
  // }

  @Get('/get-event')
  findAll(
    @Query() filterDto: EventFilterDto,
    @GetUser() user: User,
  ): Promise<Event[]> {
    return this.eventService.findAll(filterDto, user);
  }
  //Pagination by Event list
  @Get('/:paginated')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<Pagination<Event>> {
    limit = limit > 100 ? 100 : limit;
    return this.eventService.paginate({
      page,
      limit,
    });
  }
  @Get('/:id')
  getTicketByEvent(
    @Param('id') event_name: string,
    @GetUser() user: User,
    ticket: Ticket,
  ): Promise<Event> {
    return this.eventService.getTicketByEvent(event_name, user, ticket);
  }
  @Get('/:id')
  getEventById(@Param('id') id: string, @GetUser() user: User): Promise<Event> {
    return this.eventService.getEventById(id, user);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id') id: string,
    @Body() eventDto: EventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    const { event_name } = eventDto;
    return this.eventService.updateEvent(id, event_name, user);
  }
  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.eventService.deleteEvent(id, user);
  }
}
