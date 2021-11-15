import { Category } from '../entities/category.entity';

export interface CategoryRepositoryPort {
  findOneOrCreateByName(name: string): Promise<Category>;
}
