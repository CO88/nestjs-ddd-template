import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BrandRepository } from '../../database/repository/brand.repository';
import { CategoryRepository } from '../../database/repository/category.repository';
import { ClothesRepository } from '../../database/repository/clothes.repository';
import { CreateClothes } from '../../domain/interface/create-clothes.interface';

@Injectable()
export class CreateClothesService {
  constructor(private readonly connection: Connection) {}

  async create(createClothes: CreateClothes): Promise<boolean> {
    try {
      await this.connection.transaction(async (entityManager) => {
        //
        const clothesRepository = entityManager.getCustomRepository(ClothesRepository);
        const brandRepository = entityManager.getCustomRepository(BrandRepository);
        const categoryRepository = entityManager.getCustomRepository(CategoryRepository);

        const category = await categoryRepository.findOneOrCreateByName(createClothes.category);
        const brand = await brandRepository.findOneOrCreateByName(createClothes.brand);
        await clothesRepository.save(
          {
            name: createClothes.name,
            category: category,
            brand: brand,
          },
          { transaction: false, reload: false },
        );
      });
    } catch (error) {
      throw error;
    }

    return true;
  }
}
