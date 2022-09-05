import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { createWriteStream } from "fs";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //Register
  @Post("/Register")
  Register(
    @Body()
    userDto: UserDto,
  ): Promise<User> {
    return this.userService.Register(userDto);
  }

  @Get('/login')
  Login(
    @Body()
    userDto: UserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.Login(userDto);
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
