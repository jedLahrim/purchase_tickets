import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jedJlxSecret2021',
      signOptions: {
        expiresIn: 360,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, jwtStrategy],
  controllers: [AuthController],
  exports: [jwtStrategy, PassportModule],
})
export class AuthModule {}
