import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clothes } from './clothes.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Clothes)
  clothes: Clothes;
}
