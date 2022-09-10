import { IsDateString, IsString } from 'class-validator';

export class EventDto {
  @IsString()
  event_name: string;
  @IsString()
  event_address: string;
  @IsDateString()
  event_created_at: Date;
  @IsDateString()
  event_updated_at: Date;
  @IsDateString()
  event_end_date: Date;
}
