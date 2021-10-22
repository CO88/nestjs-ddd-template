import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClosetRepositoryPort } from '../../domain/interface/closet.repository.port';
import { Closet } from '../entities/closet.entity';

export class ClosetRepository
  extends Repository<Closet>
  implements ClosetRepositoryPort
{
  async findOneByOrThrow(id: number): Promise<Closet> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
}
