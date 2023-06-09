import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
<<<<<<< HEAD
=======
import { Cart } from 'src/carts/entities/cart.entity';
import { Users } from 'src/users/entities/user. entity';
>>>>>>> main

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'mysql',
//       host: process.env.DB_HOST,
//       port: +process.env.DB_PORT,
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       entities: [__dirname + 'entities/**/*.entity.ts'],
//       synchronize: false,
//       // logging: true,
//     }),
//   ],
// })
// export class DatabaseModule {}
