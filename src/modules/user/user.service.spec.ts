import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';
import { mockPostRepository, MockRepository } from 'src/util/test.util';
import { Coupon } from './domain/entities/coupon.entity';
import { Point } from './domain/entities/point.entity';
import { User } from './domain/entities/user.entity';
import { UserUpdateService } from './domain/user-update.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockPostRepository(),
        },
        UserUpdateService,
        {
          provide: getRepositoryToken(Point),
          useValue: mockPostRepository(),
        },
        {
          provide: getRepositoryToken(Coupon),
          useValue: mockPostRepository(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  describe('User 정보 get', () => {
    it('User 정보를 성공적으로 얻어옴', async () => {
      //요청할 데이터를 fake데이터로 생성한다.
      const name = faker.lorem.word();

      //존재하는 유저를 만든다.
      const existingUser = User.of({
        id: faker.datatype.number(),
        name: name,
      });

      // 유저를 db에서 가져온다. (mock)
      userRepository.findOne.mockReturnValue(existingUser);

      /**
       * service클래스에서 유저를 가져오는 메소드를 실행하여
       * 결과를 확인하고 같은지 확인한다.
       */
      const result = await userService.get(name);
      expect(result).toBe(existingUser);
    });
  });
});
