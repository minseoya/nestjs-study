import { Injectable } from '@nestjs/common';
import { Cart } from 'src/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto, InputCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createCart(cart: InputCartDto, userId: number) {
    return await this.cartRepository.save({
      userId: { id: userId },
      quantity: cart.quantity,
      productItem: { id: cart.productItem },
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
