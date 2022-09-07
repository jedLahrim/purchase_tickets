import {
  Body,
  Controller, DefaultValuePipe,
  Delete,
  Get,
  Param, ParseIntPipe,
  Patch,
  Post,
  // Put,
  Query,
  UseGuards
} from "@nestjs/common";
import { TicketDto } from './dto/ticket.dto';
import { User } from '../auth/entities/user.entity';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { GetUser } from '../auth/getUser.Decorator';
import { TicketFilterDto } from './dto/filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetEvent } from '../event/Getevent.Decorator';
import { Event } from '../event/entities/event.entity';
import { Pagination } from "nestjs-typeorm-paginate";

@Controller('ticket')
@UseGuards(AuthGuard())
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Post()
  create(
    @Body() ticketDto: TicketDto,
    @GetUser() user: User,
    @GetEvent() event: Event,
  ) {
    return this.ticketService.createTicket(ticketDto, user, event);
  }

  @Get('/get-ticket')
  findAll(
    @Query() filterDto: TicketFilterDto,
    @GetUser() user: User,
  ): Promise<Ticket[]> {
    return this.ticketService.findAll(filterDto, user);
  }

  @Get('/:id/getTicketById')
  getTicketById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return this.ticketService.getTicketById(id, user);
  }
  @Get('/:paginate')
  async index_ticket(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ): Promise<Pagination<Ticket>> {
    limit = limit > 100 ? 100 : limit;
    return this.ticketService.paginate({
      page,
      limit,
    });
  }
  @Patch('/:id/ticket_name')
  updateTask(
    @Param('id') id: string,
    @Body() ticketDto: TicketDto,
    @GetUser() user: User,
  ): Promise<Ticket> {
    const { ticket_name } = ticketDto;
    return this.ticketService.updateTicket(id, ticket_name, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.ticketService.deleteTicket(id,user);
  }
}
