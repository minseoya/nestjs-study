import { Injectable } from '@nestjs/common';
import { Cart } from 'src/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InputCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createCart(cart, userId: number) {
    cart.userId = userId;
    const id = cart.productItem;
    console.log(cart);
    return await this.cartRepository.save({
      userId: cart.userId,
      quantity: cart.quantity,
      productItem: { id },
    });
  }

  async updateCart(cart: InputCartDto, userId: number) {
    const product = await this.cartRepository.findOne({
      where: { productItem: { id: cart.productItem } },
    });
    product.quantity = cart.quantity;
    return await this.cartRepository.save(product);
  }
}
