import { Inject, Injectable } from '@nestjs/common';
import { ClothesRepository } from '../../database/repository/clothes.repository';
import { Clothes } from '../../domain/entities/clothes.entity';
import { ClothesRepositoryPort } from '../../domain/interface/closet.repository.port';
import { FindClothes } from '../../domain/interface/find-clothes.interface';

@Injectable()
export class FindClothesService {
  constructor(
    @Inject(ClothesRepository)
    private readonly closetRepository: ClothesRepositoryPort,
  ) {}

  // 컨트롤러에서 받은 request dto를 도메인 layer에 관련된 것으로 변화해야합니다.
  async find(findClothes: FindClothes): Promise<Clothes[]> {
    const clothes = await this.closetRepository.findManyOrThrow(findClothes);

    return clothes;
  }
}
