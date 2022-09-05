// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { InjectRepository } from "@nestjs/typeorm";
// import { User } from "./entities/auth.entity";
// import { Repository } from "typeorm";
// // import { JwtPayload } from "jsonwebtoken";
// import { jwtPayload } from "./jwr-playload.interface";
//
// @Injectable()
// export class jwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(User)
//     private userRepo: Repository<User>
//   ) {
//     super({
//       secretOrKey: "jedJlxSecret",
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     });
//   }
//
//   async validate(payload: jwtPayload): Promise<User> {
//     const { email } = payload;
//     const auth: User = await this.userRepo.findOneBy({ email });
//     if (!auth) {
//       throw new UnauthorizedException();
//     }
//     return auth;
//   }
// }