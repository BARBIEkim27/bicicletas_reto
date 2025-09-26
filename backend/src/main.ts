import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as dotenvConfig } from 'dotenv';
import { sign } from 'crypto';

dotenvConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true, // 👈🏽 Esta línea es necesaria
    }),
  );

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log('Server running on http://localhost:' + port);
}
bootstrap();

