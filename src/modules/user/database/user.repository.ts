import { EntityRepository, Repository } from 'typeorm';
import { User } from '../domain/entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findOneTest(name: string): Promise<User> {
    return await this.findOne({ where: { name: name } });
  }
}
