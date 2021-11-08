import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindClothesController } from './application/find-clothes/find-clothes.http.controller';
import { FindClothesService } from './application/find-clothes/find-clothes.service';
import { ClothesRepository } from './database/repository/clothes.repository';
import { entities } from './domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities, ClothesRepository])],
  controllers: [FindClothesController],
  providers: [FindClothesService],
})
export class ClothesModule {}
