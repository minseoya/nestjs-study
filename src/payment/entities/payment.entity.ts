import { Order } from 'src/order/entities/order.entity';
import { Users } from 'src/users/entities/user. entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('receipt')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  orderId: Order;

  @ManyToOne(() => Users, (user) => user.recepit)
  @JoinColumn({ name: 'user_id' })
  userId: Users;

  @Column({ name: 'order_number', type: 'varchar', length: 200 })
  orderNumber: string;

  @Column({ name: 'total_amount', type: 'int' })
  totalAmount: number;

  @Column({ type: 'json' })
  lists: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
