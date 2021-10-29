import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';
import { Clothes } from '../entities/clothes.entity';

export class ClothesRepository
  extends Repository<Clothes>
  implements ClothesRepositoryPort
{
  async findOneByOrThrow(id: number): Promise<Clothes> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
