import { Repository } from 'typeorm';
import { Category } from '../../domain/entities/category.entity';

export class CategoryRepository extends Repository<Category> {}
