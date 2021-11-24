import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { typeormConfig } from './infrastructure/configs/orm.config';
import { ClothesModule } from './modules/closet/clothes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [appConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig),
    ClothesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
