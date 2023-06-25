import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
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
  async cart(
    @Body(ValidationPipe) cart: InputCartDto,
    @Req() req: RequestUser,
  ): Promise<any> {
    const userId = req.user.id;
    const product = await this.cartsService.existCartItem(cart, userId);
    if (!product) return await this.cartsService.createCart(cart, userId);
    return await this.cartsService.updateCart(
      product,
      cart.quantity + product.quantity,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCartList(@Req() req: RequestUser): Promise<CartItem[] | null> {
    return await this.cartsService.getCartList(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updatecart(
    @Body(ValidationPipe) cart: InputCartDto,
    @Req() req: RequestUser,
  ) {
    const userId = req.user.id;
    const product = await this.cartsService.existCartItem(cart, userId);

    return await this.cartsService.updateCart(product, cart.quantity);
  }

  @UseGuards(AuthGuard)
  @Delete('delete')
  async deleteCartItem(@Body() cart: InputCartDto, @Req() req: RequestUser) {
    const userId = req.user.id;
    const product = await this.cartsService.existCartItem(cart, userId);

    return this.cartsService.deleteCartItem(product);
  }
}
