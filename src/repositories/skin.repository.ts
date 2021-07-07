import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Skin, SkinRelations} from '../models';

export class SkinRepository extends DefaultCrudRepository<
  Skin,
  typeof Skin.prototype._id,
  SkinRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(Skin, dataSource);
  }
}
