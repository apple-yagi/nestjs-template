import { ConnectionOptions } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME || 'testuser',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'mydb',
  synchronize: process.env.NODE_ENV === 'development',
  entities: [UserEntity, PostEntity],

  logging: process.env.NODE_ENV === 'development',
  logger: 'file',

  migrationsRun: false,
  migrations: ['dist/infrastructure/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'dist/infrastructure/database/migrations',
  },
};

export = config;
