import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @HttpCode(201)
  cart(@Body() cart: CreateCartDto) {
    return this.cartsService.createCart(cart);
  }
}
