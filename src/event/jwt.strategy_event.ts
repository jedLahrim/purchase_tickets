// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// // import { JwtPayload } from "jsonwebtoken";
// import { Event } from './entities/event.entity';
// import { jwtPayload } from "./jwr-playload.interface";
//
//
// @Injectable()
// export class jwt_Strategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(Event)
//     private EventRepo: Repository<Event>,
//   ) {
//     super({
//       secretOrKey: 'jedJlxSecret2021',
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }
//
//   async validate(payload: jwtPayload): Promise<Event> {
//     const { event_name } = payload;
//     const event: Event = await this.EventRepo.findOneBy({ event_name });
//     if (!event) {
//       throw new UnauthorizedException();
//     }
//     return event;
//   }
// }
