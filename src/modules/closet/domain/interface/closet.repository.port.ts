import { Closet } from '../../database/entities/closet.entity';

export interface ClosetRepositoryPort {
  findOneByOrThrow(id: number): Promise<Closet>;
}
