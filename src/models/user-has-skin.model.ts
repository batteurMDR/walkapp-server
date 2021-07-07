import {Entity, model, property} from '@loopback/repository';

@model()
export class UserHasSkin extends Entity {
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
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  skinId: string;


  constructor(data?: Partial<UserHasSkin>) {
    super(data);
  }
}

export interface UserHasSkinRelations {
  // describe navigational properties here
}

export type UserHasSkinWithRelations = UserHasSkin & UserHasSkinRelations;
