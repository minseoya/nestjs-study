import { Users } from 'src/users/entities/user. entity';
import { v4 as uuidv4 } from 'uuid';

import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'order_number', type: 'varchar', length: 200 })
  orderNumber: string;

  @Column({ name: 'total_amount', type: 'int' })
  totalAmount: number;

  @Column({ name: 'order_status_id', type: 'int' })
  orderStatusId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Users, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  userId: Users;

  @BeforeInsert()
  generateOrderNumber() {
    this.orderNumber = uuidv4();
  }
}