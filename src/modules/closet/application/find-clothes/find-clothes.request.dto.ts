import { IsOptional, IsString } from 'class-validator';

export class FindClothesRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
