import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';

@Entity()
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

  @OneToMany(() => Cart, (cart) => cart.user)
  @JoinTable()
  cart: Cart;
}
