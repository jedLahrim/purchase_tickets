import { IsString } from 'class-validator';

export class ticketDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone_number: string;

  @IsString()
  email: string;

  @IsString()
  profile_picture: string;
}
