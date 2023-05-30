import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class Users {
  @PrimaryColumn()
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
