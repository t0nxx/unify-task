import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger Documentation Config
   */
  const config = new DocumentBuilder()
    .setTitle('Unify Solutions')
    .setDescription('The Unify API description')
    .setVersion('1.0')
    .addTag('Unify')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   *  App GlobalPipes
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /**
   * Server Listening
   */
  await app.listen(3000);
}
bootstrap();
