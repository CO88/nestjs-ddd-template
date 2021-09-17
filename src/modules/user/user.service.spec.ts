import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { User } from './domain/entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
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

      // 유저를 db에서 가져온다. (mock, spyOn이용)
      const repositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      /**
       * service클래스에서 유저를 가져오는 메소드를 실행하여
       * 결과를 확인하고 같은지 확인한다.
       */
      const result = await userService.get(name);
      expect(repositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          name: name,
        },
      });
      expect(result).toBe(existingUser);
    });
  });
});
