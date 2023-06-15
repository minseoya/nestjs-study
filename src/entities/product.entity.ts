import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { ProductImage } from './productImage.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'names', type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column()
  descriptrions: string;

  @Column({ name: 'product_size', type: 'json' })
  productSize: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Cart, (cart) => cart.productItem)
  cart?: Cart[];

  @OneToMany(() => ProductImage, (productImage) => productImage.productId)
  productImage?: ProductImage[];
}
