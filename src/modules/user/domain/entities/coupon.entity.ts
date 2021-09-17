import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn({ name: 'coupon_id' })
  id: number;

  @Column({ length: 20 })
  name: string;
}
