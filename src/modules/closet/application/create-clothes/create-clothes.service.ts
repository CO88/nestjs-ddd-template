import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BrandRepository } from '../../database/repository/brand.repository';
import { CategoryRepository } from '../../database/repository/category.repository';
import { ClothesRepository } from '../../database/repository/clothes.repository';
import { BrandRepositoryPort } from '../../domain/interface/brand.repository.port';
import { CategoryRepositoryPort } from '../../domain/interface/category.repository.port';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';
import { CreateClothes } from '../../domain/interface/create-clothes.interface';

@Injectable()
export class CreateClothesService {
  constructor(private readonly connection: Connection) {}

  async create(createClothes: CreateClothes): Promise<boolean> {
    try {
      await this.connection.transaction(async (entityManager) => {
        //
        const clothesRepository: ClothesRepositoryPort =
          entityManager.getCustomRepository(ClothesRepository);

        const brandRepository: BrandRepositoryPort =
          entityManager.getCustomRepository(BrandRepository);

        const categoryRepository: CategoryRepositoryPort =
          entityManager.getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOneOrCreateByName(createClothes.category);
        const brand = await brandRepository.findOneOrCreateByName(createClothes.brand);
        await clothesRepository.saveInTransaction({
          name: createClothes.name,
          category: category,
          brand: brand,
        });
      });
    } catch (error) {
      throw error;
    }

    return true;
  }
}
