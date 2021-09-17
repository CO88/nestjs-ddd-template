import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn({ name: 'point_id' })
  id: number;

  @Column({ length: 20 })
  name: string;
}
