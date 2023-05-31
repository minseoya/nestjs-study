import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/authConfig';

@Module({
  imports: [
    DatabaseModule,
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
