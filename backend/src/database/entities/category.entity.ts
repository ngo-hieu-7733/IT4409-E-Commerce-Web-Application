import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, length: 100 })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
