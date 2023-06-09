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
    return this.cartRepository.save(cart);
  }
}
