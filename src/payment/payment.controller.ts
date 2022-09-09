import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PaymentService } from './payment.service';
import { PayPalPaymentForm } from './entities/Payment.entity';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/getUser.Decorator';

@Controller('payment')
@UseGuards(AuthGuard())
export class PaymentController {
  constructor(private PaymentService: PaymentService) {}

  @Post()
  async checkoutPayPal(
    @Res() res,
    @Body() data: PayPalPaymentForm,
    email: string|any,
    @GetUser() user: User,
  ): Promise<any> {
    if (email==user.email) {
      try {
        res.status(200).send('Successfully paid  ✅ ');
      } catch (err) {
        res.status(400).send(err);
      }
    }
    return await this.PaymentService.payout(data, email,user);
  }
}
