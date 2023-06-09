import { Column, Entity, PrimaryColumn } from 'typeorm';

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

  @Column()
  phone_number: string;
}
