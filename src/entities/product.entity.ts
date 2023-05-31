import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'names' })
  name: string;

  @Column()
  descriptrions: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Cart, (cart) => cart.product_items)
  @JoinTable()
  cart: Cart;
}
