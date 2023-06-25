import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderItem } from 'src/order/entities/orderItem.entity';
import { Receipt } from 'src/payment/entities/payment.entity';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  names: string;

  @Column()
  email: string;

  @Column()
  passwords: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @OneToMany(() => Cart, (cart) => cart.userId)
  @JoinTable()
  cart: Cart;

  @OneToMany(() => Order, (order) => order.userId)
  @JoinTable()
  order: Order;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 100000000.0 })
  points: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.userId)
  @JoinTable()
  orderItem: OrderItem;

  @OneToMany(() => OrderItem, (recepit) => recepit.userId)
  @JoinTable()
  recepit: Receipt;
}
