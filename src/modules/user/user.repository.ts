import { EntityRepository, Repository } from 'typeorm';
import { User } from './domain/entities/user.entity';

/**
 * custom repository를 사용해 쿼리들을 캡슐화한다.
 * 이 클래스를 injectable한 클래스를 만들기 위해서는
 * 사용하는 모듈에 import에
 * TypeOrmModule.forFeature([${customrepository}])
 * 과 같이 forFeature메소드에 전달해야합니다.
 *
 * @TODO 이 부분은 @InjectRepository 데코레이터를 이용하여 service클래스로 뺄것.
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findeOneTest(name: string): Promise<User> {
    return await this.findOne({ where: { name: name } });
  }
}
