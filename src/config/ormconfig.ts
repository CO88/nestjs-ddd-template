import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  //TODO: webpack 번들링을 하게되면 path는 어떻게 되는지 확인해봐야함!
  entities: ['dist/**/*.entity.{ts,js}'],
};
