import { Brand } from '../entities/brand.entity';

export interface BrandRepositoryPort {
  findOneOrCreateByName(name: string): Promise<Brand>;
}
