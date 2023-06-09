import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './user. entity';
import { Product } from './product.entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @OneToMany(() => Product, (product) => product.cart)
  product_items: Product;

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
