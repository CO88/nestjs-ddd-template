import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './config/app.config';
import { ClothesModule } from './modules/closet/clothes.module';
import { entities } from './modules/closet/domain/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          ...config.get('database'),
          entities: [...entities],
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    ClothesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
