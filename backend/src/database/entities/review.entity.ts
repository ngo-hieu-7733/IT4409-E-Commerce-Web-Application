import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Index,
    DeleteDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Index(['user', 'product'], { unique: true })
@Entity({ name: 'reviews' })
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'tinyint' })
    rating: number;

    @Column({ type: 'text', nullable: true })
    comment: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;


    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
    })
    deletedAt?: Date;

    // -----------------

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, (product) => product.reviews, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
