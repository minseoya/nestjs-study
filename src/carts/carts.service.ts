import { Injectable } from '@nestjs/common';
import { Cart } from 'src/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async createCart(cart: CreateCartDto) {
    return await this.cartRepository.save(cart);
  }

  async updateCart(cart: CreateCartDto) {
    const product = await this.cartRepository.findOne({
      where: { product_items: { id: cart.productItems } },
    });
    product.quantity = cart.quantity;
    return await this.cartRepository.save(product);
  }

  async updateCart(cart: CreateCartDto) {
    const product = await this.cartRepository.findOne({
      where: { product_items: { id: cart.productItems } },
    });
    product.quantity = cart.quantity;
    return await this.cartRepository.save(product);
  }
}
