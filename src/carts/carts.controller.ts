import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('cart API')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({
    summary: 'cart create API',
    description: '유저의 카트를 생성한다.',
  })
  @ApiCreatedResponse({ description: 'cart를 생성하지', type: Cart })
  @HttpCode(201)
  cart(@Body() cart: CreateCartDto) {
    return this.cartsService.createCart(cart);
  }

  @Post('update')
  async updatecart(@Body() cart: CreateCartDto) {
    return await this.cartsService.updateCart(cart);
  }
}
