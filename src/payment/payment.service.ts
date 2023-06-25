import { Injectable } from '@nestjs/common';
import { Receipt } from './entities/payment.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Users } from 'src/users/entities/user. entity';
import { Product } from 'src/entities/product.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';
import { OrderStatusValues } from 'src/tpye/order.status';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Receipt) private paymentRepository: Repository<Receipt>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Users) private userRepository: Repository<Users>,

    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  async createPayment(orderNumber: string) {
    const orderInfo = await this.orderRepository
      .createQueryBuilder('orders')
      .select('orders.id', 'orderId')
      .addSelect('user_id', 'userId')
      .addSelect('total_amount', 'totalAmount')
      .where('order_number = :orderNumber', { orderNumber })
      .getRawOne();
    const orderStatusId: number = OrderStatusValues['COMPLETED_PAYMENT'];
    let points: number;
    let getProductName: string[];
    const result = await this.entityManager.transaction(
      async (entityManager) => {
        await this.entityManager
          .createQueryBuilder()
          .update(Users)
          .set({ points: () => `points - :points` })
          .where('id = :id', { id: orderInfo.userId })
          .setParameter('points', orderInfo.totalAmount)
          .execute();

        const user = await this.userRepository.findOne({
          where: { id: orderInfo.userId },
        });

        points = user.points;

        getProductName = await entityManager
          .createQueryBuilder()
          .select('p.names')
          .from(Product, 'p')
          .innerJoin('order_item', 'oi', 'p.id = oi.product_id')
          .innerJoin('orders', 'o', 'oi.order_id = o.id')
          .where('oi.user_id = :userId AND o.id = :orderId', {
            userId: orderInfo.userId,
            orderId: orderInfo.orderId,
          })
          .getRawMany();

        await this.entityManager
          .createQueryBuilder()
          .update(Order)
          .set({ orderStatusId: orderStatusId })
          .where('id = :orderId', { orderId: orderInfo.orderId })
          .execute();

        const list = await this.entityManager
          .createQueryBuilder()
          .select('order_item.user_id', 'UserId')
          .addSelect(
            'JSON_ARRAYAGG(JSON_OBJECT("productId", order_item.product_id, "quantity", order_item.quantity, "price", order_item.price))',
            'lists',
          )
          .from(OrderItem, 'order_item')
          .where('order_item.order_id = :orderId', {
            orderId: orderInfo.orderId,
          })
          .groupBy('order_item.user_id')
          .getRawMany();

        const listsArray = Array.isArray(list) ? list : [list];

        const stringifyList = JSON.stringify(listsArray[0].lists);

        await entityManager.delete(OrderItem, {
          orderId: { id: orderInfo.orderId },
        });

        await this.entityManager
          .createQueryBuilder()
          .insert()
          .into(Receipt)
          .values([
            {
              orderId: { id: orderInfo.orderId },
              orderNumber: orderNumber,
              userId: { id: orderInfo.userId },
              lists: stringifyList,
              totalAmount: orderInfo.totalAmount,
            },
          ])
          .execute();
      },
    );
    return {
      totalAmout: orderInfo.totalAmount,
      updatePoint: points,
      productName: getProductName,
    };
  }
}
