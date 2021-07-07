import {Entity, model, property} from '@loopback/repository';

@model()
export class Walk extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  distance: number;

  @property({
    type: 'string',
    required: true,
  })
  localization: string;

  @property({
    type: 'number',
    required: true,
  })
  points: number;

  @property({
    type: 'string',
  })
  userId?: string;

  constructor(data?: Partial<Walk>) {
    super(data);
  }
}

export interface WalkRelations {
  // describe navigational properties here
}

export type WalkWithRelations = Walk & WalkRelations;
