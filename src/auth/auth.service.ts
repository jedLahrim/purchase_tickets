import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { jwtPayload } from "./jwr-playload.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  //Register a auth
  async Register(userDto: UserDto) {
    const { first_name, last_name, phone_number, email, profile_picture, password } = userDto;
    //saltPassword<>
    const salt = await bcrypt.genSalt();
    //HashPassword<>
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepo.create({
      first_name,
      last_name,
      phone_number,
      email,
      profile_picture,
      password: hashedPassword
    });
    // console.log('salt',salt)
    // console.log('hashedPassword',hashedPassword)
    try {
      const userPass = await this.userRepo.save(user);
      return userPass;
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw new ConflictException("auth already exist");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

//Login
  async Login(userDto: UserDto): Promise<{ accessToken }> {
    const { email, password } = userDto;
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(`email or password is incorrect`);
    }
  }
}

