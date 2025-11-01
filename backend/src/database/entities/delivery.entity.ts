import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { Shipper } from './shipper.entity';

export enum DeliveryStatus {
    PREPARING = 'preparing',
    SHIPPING = 'shipping',
    DELIVERED = 'delivered',
    FAILED = 'failed',
}

@Entity({ name: 'deliveries' })
export class Delivery {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(() => Order, (order) => order.delivery, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Shipper, (shipper) => shipper.deliveries, {
        nullable: true,
    })
    @JoinColumn({ name: 'shipper_id' })
    shipper: Shipper | null;

    @Column({
        type: 'enum',
        enum: DeliveryStatus,
        default: DeliveryStatus.PREPARING,
    })
    status: DeliveryStatus;

    @Column({
        type: 'timestamp',
        name: 'estimated_delivery_date',
        nullable: true,
    })
    estimatedDeliveryDate: Date | null;

    @Column({ type: 'timestamp', name: 'actual_delivery_date', nullable: true })
    actualDeliveryDate: Date | null;

    @Column({
        type: 'varchar',
        length: 100,
        name: 'tracking_number',
        nullable: true,
        unique: true,
    })
    trackingNumber: string | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
