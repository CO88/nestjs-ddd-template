import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './domain/entities/user.entity';
import { UserUpdateService } from './domain/user-update.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userUpdateService: UserUpdateService,
  ) {}

  async get(name: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { name: name } });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  create(): void {
    return;
  }

  update(): void {
    //유저 정보를 업데이트한다.
    //업데이트 후 쿠폰과 포인트를 지급한다.
    this.userUpdateService.givePoint();
    this.userUpdateService.issueCoupon();

    return;
  }

  delete(): void {
    return;
  }
}
