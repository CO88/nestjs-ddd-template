import { Injectable } from '@nestjs/common';
import { TypeOrmUnitOfWork } from 'src/common/ddd/infrastruture/typeorm-unit-of-work';
import { BrandRepository } from 'src/modules/closet/database/repository/brand.repository';
import { CategoryRepository } from 'src/modules/closet/database/repository/category.repository';
import { ClothesRepository } from 'src/modules/closet/database/repository/clothes.repository';

@Injectable()
export class UnitOfWork extends TypeOrmUnitOfWork {
  getBrandRepository(transanctionId: string): BrandRepository {
    return this.getEntityManager(transanctionId).getCustomRepository(BrandRepository);
  }

  getCategoryRepository(transanctionId: string): CategoryRepository {
    return this.getEntityManager(transanctionId).getCustomRepository(CategoryRepository);
  }

  getClothesRepository(transactionId: string): ClothesRepository {
    return this.getEntityManager(transactionId).getCustomRepository(ClothesRepository);
  }
}
