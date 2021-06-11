import { join } from 'path';
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
  synchronize: false,
  entities: [UserEntity, PostEntity],

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development',
  logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [join(__dirname, '**/migrations/*{.js,.ts}')],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

export = config;
