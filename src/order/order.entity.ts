import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'order' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_name: string;

  @Column()
  total_amount: number;
}
