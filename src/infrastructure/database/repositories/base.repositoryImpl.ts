import { Injectable } from '@nestjs/common';
import { Connection, EntityManager, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class BaseRepositoryImpl {
  protected queryBuilder: SelectQueryBuilder<any>;
  protected manager: EntityManager;

  constructor(private connection: Connection) {
    this.queryBuilder = connection.createQueryBuilder();
    this.manager = connection.createQueryRunner().manager;
  }
}
