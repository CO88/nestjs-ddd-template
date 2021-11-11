import { Clothes } from '../entities/clothes.entity';
import { FindClothes } from './find-clothes.interface';

export interface ClothesRepositoryPort {
  findOneByOrThrow(id: number): Promise<Clothes>;
  findManyOrThrow(findClothes: FindClothes): Promise<Clothes[]>;
  saveInTransaction(entity: Partial<Clothes>): Promise<void>;
}
