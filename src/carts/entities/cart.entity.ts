import { Product } from 'src/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryColumn()
  id: number;

  @Column()
  user_id: number;

  @OneToMany(() => Product, (product) => product.cart)
  product_items: Product;

  @Column()
  quantity: number;
}
