import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/modules/user/domain/entities/user.entity';
import { UserRepository } from 'src/modules/user/user.repository';
import { AppModule } from 'src/app.module';
import { FindUserByNameRequest } from 'src/modules/user/dto/user.request.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  /**
   * 테스트전에 사전작업을 여기에서 진행합니다.
   */
  beforeEach(async () => {
    const user = User.of({
      id: faker.datatype.number(),
      name: faker.lorem.word(),
    });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(UserRepository))
      .useFactory({
        factory: () => ({
          findOne: jest.fn(
            () =>
              new Promise((resolve) => {
                resolve(user);
              }),
          ),
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  describe('UserModule', () => {
    it('/user (GET)', () => {
      //request Dto를 사용하는 부분 깔끔하게 코드정리 할 필요가 있음
      const requestDto = new FindUserByNameRequest();
      requestDto.name = 'test';

      return request(app.getHttpServer())
        .get('/user')
        .query(requestDto)
        .expect(200);
    });
  });
});
