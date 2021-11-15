import { ApiProperty } from '@nestjs/swagger';
import { Clothes } from '../../domain/entities/clothes.entity';

export class FindClothesResponse {
  constructor(clothes: Clothes) {
    this.id = clothes.id;
    this.name = clothes.name;
    this.stock = clothes.stock;
    this.brand = clothes.brand.name;
    this.category = clothes.category.name;
  }

  @ApiProperty({ description: '' })
  id: number;

  @ApiProperty({ description: 'clothes name' })
  name: string;

  @ApiProperty({ description: 'clothes stock' })
  stock: number;

  @ApiProperty({ description: 'clothes brand' })
  brand: string;

  @ApiProperty({ description: 'clothes category' })
  category: string;

  @ApiProperty({ description: 'clothes created date' })
  createdAt: Date;
}
