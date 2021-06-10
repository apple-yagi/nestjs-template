import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'infrastructure/database/models/task.model';
import { User } from 'infrastructure/database/models/user.model';
import { setEnvironment } from 'infrastructure/enviroments';
import { TaskModule } from 'infrastructure/modules/task.module';
import { UserModule } from 'infrastructure/modules/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'testuser',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DB || 'mydb',
      entities: [User, Task],
      synchronize: true,
      logging: process.env.NODE_ENV === 'development' ? true : false,
      extra:
        process.env.NODE_ENV === 'development'
          ? {}
          : {
              socketPath: process.env.MYSQL_HOST,
            },
    }),
    TerminusModule,
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
