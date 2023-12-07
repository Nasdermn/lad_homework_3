import { Entity, PrimaryGeneratedColumn, OneToOne, BaseEntity, Column, JoinColumn } from 'typeorm';
import { User } from './user.entity.js';

@Entity('carts')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  cart_id!: number;

  @Column()
  user_id!: number;
  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;
}
