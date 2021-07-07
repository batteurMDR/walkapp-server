import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
User,
UserHasSkin,
Skin,
} from '../models';
import {UserRepository} from '../repositories';

export class UserSkinController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/skins', {
    responses: {
      '200': {
        description: 'Array of User has many Skin through UserHasSkin',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Skin)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Skin>,
  ): Promise<Skin[]> {
    return this.userRepository.skins(id).find(filter);
  }

  @post('/users/{id}/skins', {
    responses: {
      '200': {
        description: 'create a Skin model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skin)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skin, {
            title: 'NewSkinInUser',
            exclude: ['_id'],
          }),
        },
      },
    }) skin: Omit<Skin, '_id'>,
  ): Promise<Skin> {
    return this.userRepository.skins(id).create(skin);
  }

  @patch('/users/{id}/skins', {
    responses: {
      '200': {
        description: 'User.Skin PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skin, {partial: true}),
        },
      },
    })
    skin: Partial<Skin>,
    @param.query.object('where', getWhereSchemaFor(Skin)) where?: Where<Skin>,
  ): Promise<Count> {
    return this.userRepository.skins(id).patch(skin, where);
  }

  @del('/users/{id}/skins', {
    responses: {
      '200': {
        description: 'User.Skin DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Skin)) where?: Where<Skin>,
  ): Promise<Count> {
    return this.userRepository.skins(id).delete(where);
  }
}
