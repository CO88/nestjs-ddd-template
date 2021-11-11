import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepositoryPort } from '../../domain/interface/category.repository.port';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> implements CategoryRepositoryPort {
  async findOneOrCreateByName(name: string): Promise<Category> {
    const found = await this.findOne({ where: { name: name } });

    if (found) {
      return found;
    }
    const newCategory = this.save({ name: name });

    return newCategory;
  }
}
