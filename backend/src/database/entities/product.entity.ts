import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    DeleteDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';
import { Review } from './review.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number;

    @Column({ name: 'stock_quantity', type: 'int', default: 0 })
    stockQuantity: number;

    @Column({ name: 'images', type: 'simple-array', nullable: true })
    imageUrls: string[];

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

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];

    @OneToMany(() => OrderItem, (item) => item.product)
    orderItems: OrderItem[];
}
