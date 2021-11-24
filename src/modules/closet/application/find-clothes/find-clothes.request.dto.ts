import { IsOptional, IsString } from 'class-validator';

export class FindClothesRequest {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  category?: string;
}
