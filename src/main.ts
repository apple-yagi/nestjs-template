import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as chalk from 'chalk';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('v1');

  const configService = app.get(ConfigService);
  Logger.log(
    `Environment: ${chalk
      .hex('#87e8de')
      .bold(`${process.env.NODE_ENV?.toUpperCase()}`)}`,
    'Bootstrap',
  );

  // security
  app.use(helmet());

  // enable gzip compression
  app.use(compression());

  // api document
  const APP_NAME = configService.get('APP_NAME', 'Default');
  const APP_DESCRIPTION = configService.get('APP_DESCRIPTION', '');
  const API_VERSION = configService.get('API_VERSION', 'v1');
  const options = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);

  // hot reload
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false);
  throw e;
});
