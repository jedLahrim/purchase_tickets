import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { NestjsPaypalPayoutsModule } from 'nestjs-paypal-payouts';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayPalPaymentForm } from './entities/Payment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [PaymentService],
  controllers: [PaymentController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jedJlxSecret2021',
      signOptions: {
        expiresIn: 360,
      },
    }),
    TypeOrmModule.forFeature([PayPalPaymentForm]),
    AuthModule,
    NestjsPaypalPayoutsModule.register({
      environment: process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'live',
      clientId: process.env.PAYPAL_CLIENT_ID,
      clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    }),
  ],
})
export class PaymentModule {}
