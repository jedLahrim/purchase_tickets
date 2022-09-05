import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { createWriteStream } from "fs";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Register
  @Post("/Register")
  Register(
    @Body()
    userDto: UserDto,
  ): Promise<User> {
    return this.authService.Register(userDto);
  }

  @Get('/login')
  Login(
    @Body()
    userDto: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.Login(userDto);
  }
  @Post("/Upload")
  @UseInterceptors(FileInterceptor("profile_picture"))
  uploadProfile(@UploadedFile() profile_picture) {
    const path = "/Users/jed/Downloads" + profile_picture.originalname;
    const fileStream = createWriteStream(path);
    fileStream.write(profile_picture.buffer);
    fileStream.end();
    console.log(profile_picture);
  }
}
