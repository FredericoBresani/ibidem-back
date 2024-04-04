import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const crossOriginOptions = {
  origin: process.env.REQUEST_ORIGIN,
  methods: 'GET, POST, PUT, DELETE',
  headers: 'iuser, itoken, content-type, authorization',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: crossOriginOptions });
  await app.listen(8080);
}
bootstrap();
