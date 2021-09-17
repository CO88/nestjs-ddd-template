import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domain/entities/user.entity';

export class UserResponse {
  constructor(user: User) {
    this.name = user.name;
  }

  @ApiProperty({
    example: 'cobb',
    description: "user's name",
  })
  name: string;
}
