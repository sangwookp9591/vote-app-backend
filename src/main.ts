import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Next.js 클라이언트의 URL
    methods: 'GET,POST,PUT,DELETE',
  });
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
