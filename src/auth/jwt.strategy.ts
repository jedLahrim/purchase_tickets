import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { jwtPayload } from './jwr-playload.interface';
import { User } from './entities/user.entity';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {
    super({
      secretOrKey: 'jedJlxSecret2021',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: jwtPayload): Promise<User> {
    const { email } = payload;
    const auth: User = await this.userRepo.findOneBy({ email });
    if (!auth) {
      throw new UnauthorizedException();
    }
    return auth;
  }
}
