import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UnitOfWork } from 'src/infrastructure/database/unitofwork/unit-of-work';
import { BrandRepositoryPort } from '../../domain/interface/brand.repository.port';
import { CategoryRepositoryPort } from '../../domain/interface/category.repository.port';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';
import { CreateClothes } from '../../domain/interface/create-clothes.interface';

@Injectable()
export class CreateClothesService {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async create(createClothes: CreateClothes): Promise<boolean> {
    const transactionId: string = randomUUID();

    await this.unitOfWork.excute(transactionId, async () => {
      const clothesRepository: ClothesRepositoryPort =
        this.unitOfWork.getClothesRepository(transactionId);

      const brandRepository: BrandRepositoryPort =
        this.unitOfWork.getBrandRepository(transactionId);

      const categoryRepository: CategoryRepositoryPort =
        this.unitOfWork.getCategoryRepository(transactionId);

      const category = await categoryRepository.findOneOrCreateByName(createClothes.category);
      const brand = await brandRepository.findOneOrCreateByName(createClothes.brand);
      await clothesRepository.saveInTransaction({
        name: createClothes.name,
        category: category,
        brand: brand,
      });
    });

    return true;
  }
}
