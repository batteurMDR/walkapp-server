import {Entity, hasMany, model, property} from '@loopback/repository';
import {Skin} from './skin.model';
import {UserHasSkin} from './user-has-skin.model';
import {Walk} from './walk.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  sex: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
    required: true,
  })
  pointsRemaining: number;

  @property({
    type: 'string',
    required: true,
  })
  skinSelected: string;

  @hasMany(() => Walk)
  walks: Walk[];

  @hasMany(() => Skin, {through: {model: () => UserHasSkin}})
  skins: Skin[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
