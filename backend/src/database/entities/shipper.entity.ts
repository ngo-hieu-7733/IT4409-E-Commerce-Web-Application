import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';
import { Delivery } from './delivery.entity';

export enum ShipperStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    ON_DELIVERY = 'on_delivery',
}

@Entity({ name: 'shippers' })
export class Shipper {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 150 })
    name: string;

    @Column({ name: 'phone_number', length: 20 })
    phoneNumber: string;

    @Column({
        name: 'vehicle_info',
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    vehicleInfo: string | null;

    @Column({
        type: 'enum',
        enum: ShipperStatus,
        default: ShipperStatus.ACTIVE,
    })
    status: ShipperStatus;
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
    })
    deletedAt?: Date;

    // -----------------

    @OneToMany(() => Delivery, (delivery) => delivery.shipper)
    deliveries: Delivery[];
}
