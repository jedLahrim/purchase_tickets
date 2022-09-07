import {IsString, MaxLength, MinLength } from "class-validator";

export class EventDto {

  event_name: string;

  event_address: string;


  event_created_at: Date;


  event_updated_at: Date;

  event_end_date: Date;

}