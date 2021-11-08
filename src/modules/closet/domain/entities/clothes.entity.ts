import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity('clothes')
export class Clothes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ name: 'brand_id' })
  brandId: number;

  @Column({ default: 1 })
  stock: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Brand, (brand) => brand.clothes)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToOne(() => Category, (category) => category.clothes)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
