import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity, JoinColumn } from 'typeorm';
import { Order } from './order.entity.js';
import { Product } from './product.entity.js';

@Entity('order_details')
export class OrderDetails extends BaseEntity {
  @PrimaryGeneratedColumn()
  details_id!: number;

  @Column()
  order_id!: number;
  @ManyToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'order_id',
  })
  order!: Order;

  @Column()
  product_id!: number;
  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
  })
  product!: Product;

  @Column()
  quantity!: number;
}
