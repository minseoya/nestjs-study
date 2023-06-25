import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Cart } from 'src/carts/entities/cart.entity';
import { Users } from 'src/users/entities/user. entity';
import { OrderStatusValues } from 'src/tpye/order.status';
import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(
    userId: number,
    cartItems: CartItem[],
  ): Promise<{ orderNumber: string }> {
    const totalAmount = cartItems.reduce(
      (accumulator: number, currentValue: CartItem) =>
        currentValue.cart_quantity * parseInt(currentValue.product_price) +
        accumulator,
      0,
    );

    const orderStatusId: number = OrderStatusValues['PENDING_PAYMENT'];

    const orderNumber = uuidv4();
    let order;

    const result = await this.entityManager.transaction(
      async (entityManager) => {
        order = await this.entityManager.save(Order, {
          totalAmount,
          userId: { id: userId },
          orderStatusId,
          orderNumber,
        });
        const orderId: number = order.id;

        for (let item of cartItems) {
          await this.orderItemRepository.save({
            productId: { id: item.product_id },
            userId: { id: userId },
            price: parseInt(item.product_price),
            quantity: item.cart_quantity,
            orderId: { id: orderId },
          });
          await this.entityManager.delete(Cart, {
            productItem: { id: item.product_id },
          });
        }
      },
    );
    return { orderNumber };
  }
}
