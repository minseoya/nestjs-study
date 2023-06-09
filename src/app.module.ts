import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/entities/user. entity';
import { Cart } from './carts/entities/cart.entity';
import { Product } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/authConfig';
import { AuthModule } from './auth/auth.module';
import { ProductImage } from './entities/productImage.entity';
import { Order } from './order/entities/order.entity';
import { OrderModule } from './order/order.module';
import { OrderItem } from './order/entities/orderItem.entity';
import { PaymentModule } from './payment/payment.module';
import { Receipt } from './payment/entities/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Cart, Product, ProductImage, Order, OrderItem, Receipt],
      synchronize: true,
      // logging: true,
    }),
    UsersModule,
    CartsModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/.${process.env.NODE_ENV}.env`],
      load: [authConfig],
      isGlobal: true,
    }),
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
