import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/authConfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + 'entities/**/*.entity.ts'],
      synchronize: false,
      // logging: true,
    }),
    UsersModule,
    CartsModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [authConfig],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
