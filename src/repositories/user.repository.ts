import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {User, UserRelations, Walk, Skin, UserHasSkin} from '../models';
import {WalkRepository} from './walk.repository';
import {UserHasSkinRepository} from './user-has-skin.repository';
import {SkinRepository} from './skin.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id,
  UserRelations
> {

  public readonly walks: HasManyRepositoryFactory<Walk, typeof User.prototype._id>;

  public readonly skins: HasManyThroughRepositoryFactory<Skin, typeof Skin.prototype._id,
          UserHasSkin,
          typeof User.prototype._id
        >;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource, @repository.getter('WalkRepository') protected walkRepositoryGetter: Getter<WalkRepository>, @repository.getter('UserHasSkinRepository') protected userHasSkinRepositoryGetter: Getter<UserHasSkinRepository>, @repository.getter('SkinRepository') protected skinRepositoryGetter: Getter<SkinRepository>,
  ) {
    super(User, dataSource);
    this.skins = this.createHasManyThroughRepositoryFactoryFor('skins', skinRepositoryGetter, userHasSkinRepositoryGetter,);
    this.registerInclusionResolver('skins', this.skins.inclusionResolver);
    this.walks = this.createHasManyRepositoryFactoryFor('walks', walkRepositoryGetter,);
    this.registerInclusionResolver('walks', this.walks.inclusionResolver);
  }
}
