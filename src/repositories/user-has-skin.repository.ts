import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {UserHasSkin, UserHasSkinRelations} from '../models';

export class UserHasSkinRepository extends DefaultCrudRepository<
  UserHasSkin,
  typeof UserHasSkin.prototype._id,
  UserHasSkinRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(UserHasSkin, dataSource);
  }
}
