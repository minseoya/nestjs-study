import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/entities/cart.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), AuthModule],
  providers: [CartsService],
  controllers: [CartsController],
})
export class CartsModule {}
