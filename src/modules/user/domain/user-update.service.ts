import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { Point } from './entities/point.entity';

@Injectable()
export class UserUpdateService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepo: Repository<Point>,
    @InjectRepository(Coupon)
    private readonly couponRepo: Repository<Coupon>,
  ) {}

  // 쿠폰을 발급
  issueCoupon(): void {
    return;
  }

  // 포인트를 지급
  givePoint(): void {
    return;
  }
}
