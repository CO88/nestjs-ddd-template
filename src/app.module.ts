import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { typeormConfig } from './infrastructure/configs/orm.config';
import { UnitOfWorkModule } from './infrastructure/database/unitofwork/unit-of-work.module';
import { ClothesModule } from './modules/closet/clothes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [appConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig),
    UnitOfWorkModule,
    ClothesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
