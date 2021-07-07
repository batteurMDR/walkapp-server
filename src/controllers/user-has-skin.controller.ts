import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserHasSkin} from '../models';
import {UserHasSkinRepository} from '../repositories';

export class UserHasSkinController {
  constructor(
    @repository(UserHasSkinRepository)
    public userHasSkinRepository : UserHasSkinRepository,
  ) {}

  @post('/user-has-skins')
  @response(200, {
    description: 'UserHasSkin model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserHasSkin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasSkin, {
            title: 'NewUserHasSkin',
            exclude: ['_id'],
          }),
        },
      },
    })
    userHasSkin: Omit<UserHasSkin, '_id'>,
  ): Promise<UserHasSkin> {
    return this.userHasSkinRepository.create(userHasSkin);
  }

  @get('/user-has-skins/count')
  @response(200, {
    description: 'UserHasSkin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserHasSkin) where?: Where<UserHasSkin>,
  ): Promise<Count> {
    return this.userHasSkinRepository.count(where);
  }

  @get('/user-has-skins')
  @response(200, {
    description: 'Array of UserHasSkin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserHasSkin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserHasSkin) filter?: Filter<UserHasSkin>,
  ): Promise<UserHasSkin[]> {
    return this.userHasSkinRepository.find(filter);
  }

  @patch('/user-has-skins')
  @response(200, {
    description: 'UserHasSkin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasSkin, {partial: true}),
        },
      },
    })
    userHasSkin: UserHasSkin,
    @param.where(UserHasSkin) where?: Where<UserHasSkin>,
  ): Promise<Count> {
    return this.userHasSkinRepository.updateAll(userHasSkin, where);
  }

  @get('/user-has-skins/{id}')
  @response(200, {
    description: 'UserHasSkin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserHasSkin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserHasSkin, {exclude: 'where'}) filter?: FilterExcludingWhere<UserHasSkin>
  ): Promise<UserHasSkin> {
    return this.userHasSkinRepository.findById(id, filter);
  }

  @patch('/user-has-skins/{id}')
  @response(204, {
    description: 'UserHasSkin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserHasSkin, {partial: true}),
        },
      },
    })
    userHasSkin: UserHasSkin,
  ): Promise<void> {
    await this.userHasSkinRepository.updateById(id, userHasSkin);
  }

  @put('/user-has-skins/{id}')
  @response(204, {
    description: 'UserHasSkin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userHasSkin: UserHasSkin,
  ): Promise<void> {
    await this.userHasSkinRepository.replaceById(id, userHasSkin);
  }

  @del('/user-has-skins/{id}')
  @response(204, {
    description: 'UserHasSkin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userHasSkinRepository.deleteById(id);
  }
}
