import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';

@Entity('orders')
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id!: number;

  @Column()
  user_id!: number;
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @Column({ type: 'timestamp' })
  order_date!: Date;
}
