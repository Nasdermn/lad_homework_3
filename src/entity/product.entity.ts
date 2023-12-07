import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id!: number;

  @Column({ unique: true })
  title!: string;

  @Column()
  type!: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: number;

  @Column('text')
  description!: string;
}
