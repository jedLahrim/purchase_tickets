import { IsOptional, IsString } from "class-validator";
export class EventFilterDto {
  @IsOptional()
  @IsString()
  search?: string;
}