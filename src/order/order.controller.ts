import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestUser } from 'src/interface/req.interface';
import { CartsService } from 'src/carts/carts.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly cartService: CartsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder(@Req() req: RequestUser) {
    const userId = req.user.id;
    const cartItems = await this.cartService.getCartList(userId);
    return await this.orderService.createOrder(userId, cartItems);
  }
}
