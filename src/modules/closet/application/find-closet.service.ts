import { Injectable } from '@nestjs/common';
import { ClosetRepository } from '../database/repository/closet.repository';
import { Closet } from '../domain/entities/closet.entity';

@Injectable()
export class FindClosetService {
  constructor(private readonly closetRepository: ClosetRepository) {}

  async find(id: number): Promise<Closet> {
    const closet = this.closetRepository.findOneByOrThrow(id);
    return;
  }
}
