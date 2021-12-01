import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UnitOfWork } from 'src/infrastructure/database/unitofwork/unit-of-work';
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

      await clothesRepository.createClothes(
        createClothes.name,
        createClothes.category,
        createClothes.brand,
      );
    });
    return true;
  }
}
