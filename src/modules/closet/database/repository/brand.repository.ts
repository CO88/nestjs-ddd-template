import { EntityRepository, Repository } from 'typeorm';
import { Brand } from '../../domain/entities/brand.entity';
import { BrandRepositoryPort } from '../../domain/interface/brand.repository.port';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> implements BrandRepositoryPort {
  async findOneOrCreateByName(name: string): Promise<Brand> {
    const found = await this.findOne({ where: { name: name } });

    if (found) {
      return found;
    }
    const newBrand = this.save({ name: name });

    return newBrand;
  }
}
