import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appEnv = configService.get<string>('APP_ENV', 'development');
  const appPort = configService.get<number>('APP_PORT', 3000);

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
