import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: 3306,
      username: process.env.MYSQL_USER || 'testuser',
      password: process.env.MYSQL_PASSWORD || 'password',
      database: process.env.MYSQL_DB || 'mydb',
      entities: [UserEntity, PostEntity],
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
})
export class DatabaseModule {}
