import { Repository } from 'typeorm';
import { Brand } from '../../domain/entities/brand.entity';

export class BrandRepository extends Repository<Brand> {}
