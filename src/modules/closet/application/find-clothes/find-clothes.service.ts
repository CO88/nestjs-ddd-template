import { Inject, Injectable } from '@nestjs/common';
import { ClothesRepository } from '../../database/repository/clothes.repository';
import { ClothesEntity } from '../../domain/entities/clothes.entity';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';

@Injectable()
export class FindClosetService {
  constructor(
    @Inject(ClothesRepository)
    private readonly closetRepository: ClothesRepositoryPort,
  ) {}

  async find(id: number): Promise<ClothesEntity> {
    const clothes = this.closetRepository.findOneByOrThrow(id);
    return;
  }
}
