import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './domain/entities/coupon.entity';
import { Point } from './domain/entities/point.entity';
import { User } from './domain/entities/user.entity';
import { UserUpdateService } from './domain/user-update.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Point, Coupon])],
  controllers: [UserController],
  providers: [UserService, UserUpdateService],
})
export class UserModule {}
