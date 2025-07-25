import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API documentation for Todo App')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const dataSource = app.get(DataSource);
  if (dataSource.isInitialized) {
    console.log('Database is already connected');
  } else {
    try {
      await dataSource.initialize();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      process.exit(1);
    }
  }

  await app.listen(3000);
  console.log('Application listening on port 3000');
}
bootstrap();
