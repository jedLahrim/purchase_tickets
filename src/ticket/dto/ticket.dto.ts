import { IsDate, IsDateString, IsString } from 'class-validator';

export class TicketDto {
  @IsString()
  ticket_name: string;
  @IsString()
  available_count: string;
  @IsDateString()
  ticket_created_at: Date;
  @IsDateString()
  ticket_updated_at: Date;
}
