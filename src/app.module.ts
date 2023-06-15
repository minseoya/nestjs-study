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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '000618',
      database: 'uniconNest',
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      entities: [Users, Cart, Product, ProductImage],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
