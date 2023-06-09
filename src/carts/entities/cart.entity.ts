import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  product_items: number;

  @Column()
  quantity: number;
}
