import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateClothesRequest } from './create-clothes.request.dto';
import { CreateClothesService } from './create-clothes.service';

@Controller('clothes')
export class CreateClothesController {
  constructor(private readonly createClothesService: CreateClothesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() payload: CreateClothesRequest): Promise<boolean> {
    const result = await this.createClothesService.create(payload);
    return result;
  }
}
