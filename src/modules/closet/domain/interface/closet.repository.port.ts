import { Clothes } from '../../database/entities/clothes.entity';

export interface ClothesRepositoryPort {
  findOneByOrThrow(id: number): Promise<Clothes>;
}
