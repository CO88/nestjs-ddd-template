import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clothes } from './clothes.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Clothes)
  clothes: Clothes;
}
