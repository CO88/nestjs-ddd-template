import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ length: 20 })
  name: string;

  static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}
