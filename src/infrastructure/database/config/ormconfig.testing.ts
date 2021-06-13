import { ConnectionOptions } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { UserEntity } from '../entities/user.entity';

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
  type: 'mysql',
  host: 'mysql_test',
  port: 3306,
  username: 'testuser',
  password: 'password',
  database: 'mydb_test',
  synchronize: false,
  entities: [UserEntity, PostEntity],

  migrationsRun: false,
  migrations: ['src/infrastructure/database/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/infrastructure/database/migrations',
  },
};

export = config;
