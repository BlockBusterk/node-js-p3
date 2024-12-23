import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/exception.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:8080', 
    methods: 'GET,POST,PUT,DELETE, PATCH', 
    allowedHeaders: 'Content-Type, Authorization', 
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
