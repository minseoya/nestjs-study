import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Users } from './user. entity';

@Entity()
export class Cart {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'product_items' })
  productItems: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Users, (user) => user.cart)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
