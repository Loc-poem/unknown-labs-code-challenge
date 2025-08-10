import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:3000'], // #toDo: use env variable to config for cors
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  const appEnv = configService.get<string>('APP_ENV', 'development');
  const appPort = configService.get<number>('APP_PORT', 3002);

  if (appEnv !== "production1") {
    const options = new DocumentBuilder()
      .setTitle("API docs")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  await app.listen(appPort);
}
bootstrap();
