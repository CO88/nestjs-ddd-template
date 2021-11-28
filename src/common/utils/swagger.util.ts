import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * @param {INestApplication} app
 */
export function initSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('This is Title')
    .setDescription('This is Description')
    .setVersion('This is Version')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
}
