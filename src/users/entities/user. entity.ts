import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';

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
}
