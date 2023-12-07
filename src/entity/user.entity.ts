import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity.js';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password_hash!: string;

  @Column()
  role_id!: number;
  @ManyToOne(() => Role, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'role_id',
  })
  role!: Role;
}
