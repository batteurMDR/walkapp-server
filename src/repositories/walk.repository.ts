import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Walk, WalkRelations} from '../models';

export class WalkRepository extends DefaultCrudRepository<
  Walk,
  typeof Walk.prototype._id,
  WalkRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(Walk, dataSource);
  }
}
