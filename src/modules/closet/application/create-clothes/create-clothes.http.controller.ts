import { Controller } from '@nestjs/common';

@Controller('clothes')
export class CreateClothesController {
  async create(): Promise<boolean> {
    return;
  }
}
