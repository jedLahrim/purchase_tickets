import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class PayPalPaymentForm extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Email string' })
  @Column({ nullable: true })
  email: string;

  @ManyToOne((_type) => User, (user) => user.payment, {
    eager: false,
  })
  user: User;
  @RelationId((payment: PayPalPaymentForm) => payment.user)
  userId: string;
}
