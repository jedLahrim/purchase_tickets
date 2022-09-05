import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  first_name: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  last_name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  phone_number: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  profile_picture: string;
}
