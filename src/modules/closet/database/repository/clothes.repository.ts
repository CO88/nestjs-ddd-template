import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';
import { Clothes } from '../../domain/entities/clothes.entity';
import { FindClothes } from '../../domain/interface/find-clothes.interface';

@EntityRepository(Clothes)
export class ClothesRepository extends Repository<Clothes> implements ClothesRepositoryPort {
  async findOneByOrThrow(id: number): Promise<Clothes> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async findManyOrThrow(findClothes: FindClothes): Promise<Clothes[]> {
    const query = await this.createQueryBuilder('clothes')
      .innerJoinAndSelect('clothes.brand', 'brand')
      .innerJoinAndSelect('clothes.category', 'category');

    if (findClothes.brand) {
      query.andWhere('brand.name = :brand', { brand: findClothes.brand });
    }

    if (findClothes.category) {
      query.andWhere('category.name = :category', { category: findClothes.category });
    }

    if (findClothes.name) {
      query.andWhere('clothes.name = :name', { name: findClothes.name });
    }

    const found = query.getMany();

    return found;
  }

  async saveInTransaction(entity: Partial<Clothes>): Promise<void> {
    await this.save(entity, { transaction: false, reload: false });
  }
}
