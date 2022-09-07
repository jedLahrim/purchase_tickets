import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { AuthModule } from '../auth/auth.module';
import { EventsModule } from '../event/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), AuthModule, EventsModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
