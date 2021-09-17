import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/ormconfig';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
