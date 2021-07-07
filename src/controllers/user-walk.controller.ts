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
  Walk,
} from '../models';
import {UserRepository} from '../repositories';

export class UserWalkController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/walks', {
    responses: {
      '200': {
        description: 'Array of User has many Walk',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Walk)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Walk>,
  ): Promise<Walk[]> {
    return this.userRepository.walks(id).find(filter);
  }

  @post('/users/{id}/walks', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Walk)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {
            title: 'NewWalkInUser',
            exclude: ['_id'],
            optional: ['userId']
          }),
        },
      },
    }) walk: Omit<Walk, '_id'>,
  ): Promise<Walk> {
    return this.userRepository.walks(id).create(walk);
  }

  @patch('/users/{id}/walks', {
    responses: {
      '200': {
        description: 'User.Walk PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {partial: true}),
        },
      },
    })
    walk: Partial<Walk>,
    @param.query.object('where', getWhereSchemaFor(Walk)) where?: Where<Walk>,
  ): Promise<Count> {
    return this.userRepository.walks(id).patch(walk, where);
  }

  @del('/users/{id}/walks', {
    responses: {
      '200': {
        description: 'User.Walk DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Walk)) where?: Where<Walk>,
  ): Promise<Count> {
    return this.userRepository.walks(id).delete(where);
  }
}
