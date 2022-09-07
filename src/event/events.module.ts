import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
// import { jwt_Strategy } from "./jwt.strategy_event";

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    AuthModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
  // exports: [jwt_Strategy, PassportModule],
})
export class EventsModule {}
