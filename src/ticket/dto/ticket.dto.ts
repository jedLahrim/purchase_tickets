import { IsOptional, IsString } from 'class-validator';

export class TicketDto {

  ticket_name: string;


  available_count: string;

  ticket_created_at: Date;

  ticket_updated_at: Date;

}
