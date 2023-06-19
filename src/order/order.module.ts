import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { Users } from 'src/users/entities/user. entity';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CartsService } from 'src/carts/carts.service';
import { OrderItem } from './entities/orderItem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Cart, Order, OrderItem]),
    AuthModule,
  ],
  providers: [OrderService, CartsService],
  controllers: [OrderController],
})
export class OrderModule {}
