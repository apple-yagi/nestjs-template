import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/nest',
    ),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || 'root',
      database: process.env.MYSQL_DB || 'mydb',
      entities: ['./**/*.entity{.js,.ts}'],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development' ? true : false,
      extra:
        process.env.NODE_ENV === 'development'
          ? {}
          : {
              socketPath: process.env.MYSQL_HOST,
            },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
