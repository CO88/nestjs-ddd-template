import { Controller, Get, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { FindUserByNameRequest } from '../dto/user.request.dto';
import { UserResponse } from '../dto/user.response.dto';
import { UserService } from '../application/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: UserResponse })
  @Get()
  async get(@Query() { name }: FindUserByNameRequest): Promise<UserResponse> {
    const user = await this.userService.get(name);

    return new UserResponse(user);
  }
}
