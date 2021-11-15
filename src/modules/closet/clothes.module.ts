import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateClothesController } from './application/create-clothes/create-clothes.http.controller';
import { CreateClothesService } from './application/create-clothes/create-clothes.service';
import { FindClothesController } from './application/find-clothes/find-clothes.http.controller';
import { FindClothesService } from './application/find-clothes/find-clothes.service';
import { ClothesRepository } from './database/repository/clothes.repository';
import { entities } from './domain/entities';

@Module({
  imports: [TypeOrmModule.forFeature([...entities, ClothesRepository])],
  controllers: [FindClothesController, CreateClothesController],
  providers: [FindClothesService, CreateClothesService],
})
export class ClothesModule {}
