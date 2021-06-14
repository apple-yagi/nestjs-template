import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as chalk from 'chalk';
import * as compression from 'compression';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('/api/v1');

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
  const options = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Nest API template')
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1', app, document);

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
