import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateClothesRequest {
  @ApiProperty({ description: '추가할 옷 이름' })
  @IsString()
  name: string;

  @ApiProperty({ description: '추가할 옷 종류' })
  @IsString()
  category: string;

  @ApiProperty({ description: '추가할 옷 브랜드' })
  @IsString()
  brand: string;
}
