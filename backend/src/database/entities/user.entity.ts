import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Review } from './review.entity';

@Entity({ name: 'users' })
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

    @Column({ name: 'phone_number', nullable: true, unique: true })
    phone: string;

    @Column({ nullable: true })
    address: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: false, default: 1 })
    tokenVersion: number;

    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user',
    })
    role: string;

    @Column({ default: false })
    mustChangePassword: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // -----------------

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];
}
