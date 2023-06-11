import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../carts/entities/cart.entity';

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

  @ManyToMany(() => Cart, (cart) => cart.productItem)
  @JoinTable()
  cart?: Cart[];
}
