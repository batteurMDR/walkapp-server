import {Entity, model, property} from '@loopback/repository';

@model()
export class Skin extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'number',
    required: true,
  })
  cost: number;


  constructor(data?: Partial<Skin>) {
    super(data);
  }
}

export interface SkinRelations {
  // describe navigational properties here
}

export type SkinWithRelations = Skin & SkinRelations;
