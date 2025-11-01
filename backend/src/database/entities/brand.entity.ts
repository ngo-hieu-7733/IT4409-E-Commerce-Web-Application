import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true, length: 100 })
    name: string;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
