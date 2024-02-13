import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(process.env.APP_PORT, process.env.APP_HOST);
//   console.log(`[MS-COMPTA] URL : ${process.env.APP_HOST}:${process.env.APP_PORT} ||| MONGODB : ${process.env.MONGO_DNS}`)
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  });
  app.listen()
}
bootstrap();
