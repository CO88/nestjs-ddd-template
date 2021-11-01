import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { BrandRepository } from '../../database/repository/brand.repository';
import { CategoryRepository } from '../../database/repository/category.repository';
import { ClothesRepository } from '../../database/repository/clothes.repository';

@Injectable()
export class CreateClothesService {
  constructor(private readonly connection: Connection) {}

  async create(): Promise<boolean> {
    await this.connection.transaction(async (entityManager) => {
      //
      const clothesRepository =
        entityManager.getCustomRepository(ClothesRepository);
      const brandRepository =
        entityManager.getCustomRepository(BrandRepository);
      const categoryRepository =
        entityManager.getCustomRepository(CategoryRepository);
    });
    return;
  }
}
