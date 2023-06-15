import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_image')
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'image_url', type: 'varchar', length: 2000 })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.productImage)
  @JoinColumn({ name: 'product_id' })
  productId?: Product;
}
