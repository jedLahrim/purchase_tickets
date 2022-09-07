import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jedJlxSecret2021',
      signOptions: {
        expiresIn: 360,
      },
    }),
    TypeOrmModule.forFeature([Event]),
    AuthModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
  // exports: [jwt_Strategy, PassportModule],
})
export class EventsModule {}
