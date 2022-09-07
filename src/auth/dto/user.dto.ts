import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  first_name: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  last_name: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  phone_number: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
  @IsOptional()
  @IsString()
  profile_picture: string;
}
