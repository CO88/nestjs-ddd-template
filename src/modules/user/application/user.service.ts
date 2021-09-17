import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../database/user.repository';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepo: Repository<User>,
    private readonly userRepo: UserRepository,
  ) {}

  async get(name: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { name: name } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
