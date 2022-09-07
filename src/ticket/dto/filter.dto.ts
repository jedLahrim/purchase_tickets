import { IsOptional, IsString } from "class-validator";
export class TicketFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}