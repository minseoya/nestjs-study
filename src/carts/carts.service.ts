import { Injectable } from '@nestjs/common';
import { Cart } from 'src/carts/entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InputCartDto, UpdateCartDto } from './dto/create-cart.dto';

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

  async existCartItem(
    cart: InputCartDto,
    userId: number,
  ): Promise<UpdateCartDto> {
    const product = await this.cartRepository.findOne({
      where: { productItem: { id: cart.productItem }, userId: { id: userId } },
    });
    return product;
  }

  async updateCart(product: UpdateCartDto, quantity: number) {
    product.quantity = quantity;
    return await this.cartRepository.save(product);
  }

  async deleteCartItem(product: UpdateCartDto) {
    return await this.cartRepository.delete({
      id: product.id,
    });
  }

  async getCartList(userId: number): Promise<CartItem[]> {
    const cartList = await this.cartRepository
      .createQueryBuilder('cart')
      .select([
        'cart.id',
        'product.id',
        'product.price',
        'product.names',
        'cart.quantity',
        'img.image_url',
      ])
      .innerJoin('cart.productItem', 'product')
      .innerJoin(
        (qb) => {
          return qb
            .select('product_id')
            .addSelect('JSON_ARRAYAGG(image_url)', 'image_url')
            .from('product_image', 'pi')
            .groupBy('product_id');
        },
        'img',
        'img.product_id = cart.productItem',
      )
      .where('cart.user_id = :userId', { userId })
      .getRawAndEntities();
    return cartList.raw;
  }
}
