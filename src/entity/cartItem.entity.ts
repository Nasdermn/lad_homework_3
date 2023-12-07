import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BaseEntity, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity.js';
import { Product } from './product.entity.js';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  item_id!: number;

  @Column()
  cart_id!: number;
  @ManyToOne(() => Cart, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'cart_id',
  })
  cart!: Cart;

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
