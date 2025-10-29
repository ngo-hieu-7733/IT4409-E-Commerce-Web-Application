
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['email', 'role'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false, default: 1 })
  tokenVersion: number;

  @Column({
    type: 'enum',
    enum: ['user', 'store', 'admin'],
    default: 'user',
  })
  role: string;

  @Column({ default: false })
  mustChangePassword: boolean;

  @Column({ nullable: false, default: 0 })
  quota: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
