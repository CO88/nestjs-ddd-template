import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './util/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 클라이언트의 페이로드에 대해 유효성 검사 규칙을 사용
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, //오류 메시지를 설명하는 옵션
      whitelist: true, // 없는 속성 필터링
      forbidNonWhitelisted: true, // 화이트리스트에 없는 오류 응답여부
    }),
  );

  // swagger
  initSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
