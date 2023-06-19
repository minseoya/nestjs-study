import { Users } from 'src/users/entities/user. entity';
import { v4 as uuidv4 } from 'uuid';

import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/entities/product.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Users, (user) => user.orderItem)
  @JoinColumn({ name: 'user_id' })
  userId: Users;

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'order_id' })
  orderId: Order;

  @ManyToOne(() => Product, (productId) => productId.orderItem)
  @JoinColumn({ name: 'product_id' })
  productId: Product;
}
