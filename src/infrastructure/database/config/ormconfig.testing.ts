import { ConnectionOptions } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_TEST || 'localhost',
  port: Number(process.env.DB_PORT_TEST) || 3307,
  username: process.env.DB_USERNAME_TEST || 'testuser',
  password: process.env.DB_PASSWORD_TEST || 'password',
  database: process.env.DB_DATABASE_TEST || 'mydb_test',
  synchronize: false,
  entities: [UserEntity, PostEntity],

  migrationsRun: false,
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

export = config;
