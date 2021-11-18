import { Controller, Get, HttpCode, Query, UsePipes } from '@nestjs/common';
import { ValidatePayloadExists } from 'src/common/pipes/validator-payload-exists.pipe';
import { FindClothesRequest } from './find-clothes.request.dto';
import { FindClothesResponse } from './find-clothes.response.dto';
import { FindClothesService } from './find-clothes.service';

@Controller('clothes')
export class FindClothesController {
  constructor(private readonly findClothesService: FindClothesService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new ValidatePayloadExists())
  async get(@Query() payload: FindClothesRequest): Promise<FindClothesResponse[]> {
    const clothesList = await this.findClothesService.find(payload);
    return clothesList.map((clothes) => new FindClothesResponse(clothes));
  }
}
