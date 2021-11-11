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
    const found = await this.find({
      where: {
        name: findClothes.name,
        brand: { name: findClothes.brand },
        category: { name: findClothes.category },
      },
      relations: ['brand', 'category'],
    });

    return found;
  }

  async saveInTransaction(entity: Partial<Clothes>): Promise<void> {
    await this.save(entity, { transaction: false, reload: false });
  }
}
