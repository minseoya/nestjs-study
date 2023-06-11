import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cart } from './entities/cart.entity';
import { InputCartDto } from './dto/create-cart.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestUser } from 'src/interface/req.interface';

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
  cart(@Body() cart: InputCartDto, @Req() req: RequestUser) {
    const userId = req.user.id;

    return this.cartsService.createCart(cart, userId);
  }

  @Post('update')
  async updatecart(@Body() cart: InputCartDto, @Req() req: RequestUser) {
    const userId = req.user.id;
    return await this.cartsService.updateCart(cart, userId);
  }
}
