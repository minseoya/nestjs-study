import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Receipt } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Users } from 'src/users/entities/user. entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, Order, Users])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
