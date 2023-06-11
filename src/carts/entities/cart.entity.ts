import { Product } from 'src/entities/product.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/user. entity';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToMany(() => Product, (product) => product.cart)
  @JoinColumn({ name: 'product_items' }) // 여기에서 이름을 변경
  productItem?: Product[]; // 이름을 변경한 속성

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  userId: Users;
}
