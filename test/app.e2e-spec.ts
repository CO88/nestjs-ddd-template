import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as faker from 'faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../src/modules/user/domain/entities/user.entity';
import { FindUserByNameRequest } from './../src/modules/user/dto/user.request.dto';
import { UserModule } from './../src/modules/user/user.module';
import { Point } from './../src/modules/user/domain/entities/point.entity';
import { Coupon } from './../src/modules/user/domain/entities/coupon.entity';
import { mockPostRepository } from './../src/util/test.util';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const userRepo = mockPostRepository();
  const pointRepo = mockPostRepository();
  const couponRepo = mockPostRepository();
  /**
   * 테스트전에 사전작업을 여기에서 진행합니다.
   */
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userRepo)
      .overrideProvider(getRepositoryToken(Point))
      .useValue(pointRepo)
      .overrideProvider(getRepositoryToken(Coupon))
      .useValue(couponRepo)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('UserModule', () => {
    it('/user (GET)', () => {
      //request Dto를 사용하는 부분 깔끔하게 코드정리 할 필요가 있음
      const requestDto = new FindUserByNameRequest();
      const name = faker.lorem.word();

      requestDto.name = name;
      const user = User.of({
        id: faker.datatype.number(),
        name: name,
      });
      userRepo.findOne.mockReturnValue(user);

      return request(app.getHttpServer())
        .get('/user')
        .query(requestDto)
        .expect(200);
    });
  });
});
