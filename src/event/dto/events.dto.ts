import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class EventDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  event_name: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  event_address: string;

  @IsString()
  event_created_at: Date;

  @IsString()
  event_updated_at: Date;

}