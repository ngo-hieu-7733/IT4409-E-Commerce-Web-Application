import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
}

export enum IsVerified {
    PENDING = 'pending',
    VERIFIED = 'verified',
    FAILED = 'failed',
}

@Entity({ name: 'payments' })
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: ['banking'],
        default: 'banking',
    })
    method: string;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status: PaymentStatus;

    @Column({
        name: 'is_verified',
        type: 'enum',
        enum: IsVerified,
        default: IsVerified.PENDING,
    })
    isVerified: IsVerified;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // -----------------

    @OneToOne(() => Order, (order) => order.payment)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}
