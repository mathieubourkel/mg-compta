import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
}
bootstrap();
