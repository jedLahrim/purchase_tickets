import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectPaypal, InjectPaypalClient } from 'nestjs-paypal-payouts';
import { PayPalPaymentForm } from './entities/Payment.entity';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PayPalPaymentForm)
    private paypalRepo: Repository<PayPalPaymentForm>,
    @InjectPaypalClient()
    private readonly paypalClient,
    @InjectPaypal()
    private readonly paypal,
  ) {}

  async payout(data: PayPalPaymentForm, user: User, email: string|any) {
    const request = new this.paypal.payouts.PayoutsPostRequest();

    request.requestBody({
      sender_batch_header: {
        recipient_type: 'email',
        email_message: 'SDK payouts test txn',
        note: 'Enjoy your Payout!!',
        sender_batch_id: 'Test_sdk_1',
        email_subject: 'This is a test transaction from SDK',
      },
      items: [
        {
          note: 'Your 5$ Payout!',
          amount: {
            currency: 'USD',
            value: '1.00',
          },
          receiver: 'payout-sdk-1@paypal.com',
          sender_item_id: 'Test_txn_1',
        },
      ],
    });
    let response = await this.paypalClient.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Payouts Create Response: ${JSON.stringify(response.result)}`);
    if (email == user.email) {
      return response;
    } else {
      throw new UnauthorizedException('email is incorrect');
    }
  }
}
