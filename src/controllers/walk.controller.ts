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
import {Walk} from '../models';
import {WalkRepository} from '../repositories';

export class WalkController {
  constructor(
    @repository(WalkRepository)
    public walkRepository : WalkRepository,
  ) {}

  @post('/walks')
  @response(200, {
    description: 'Walk model instance',
    content: {'application/json': {schema: getModelSchemaRef(Walk)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {
            title: 'NewWalk',
            exclude: ['_id'],
          }),
        },
      },
    })
    walk: Omit<Walk, '_id'>,
  ): Promise<Walk> {
    return this.walkRepository.create(walk);
  }

  @get('/walks/count')
  @response(200, {
    description: 'Walk model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Walk) where?: Where<Walk>,
  ): Promise<Count> {
    return this.walkRepository.count(where);
  }

  @get('/walks')
  @response(200, {
    description: 'Array of Walk model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Walk, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Walk) filter?: Filter<Walk>,
  ): Promise<Walk[]> {
    return this.walkRepository.find(filter);
  }

  @patch('/walks')
  @response(200, {
    description: 'Walk PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {partial: true}),
        },
      },
    })
    walk: Walk,
    @param.where(Walk) where?: Where<Walk>,
  ): Promise<Count> {
    return this.walkRepository.updateAll(walk, where);
  }

  @get('/walks/{id}')
  @response(200, {
    description: 'Walk model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Walk, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Walk, {exclude: 'where'}) filter?: FilterExcludingWhere<Walk>
  ): Promise<Walk> {
    return this.walkRepository.findById(id, filter);
  }

  @patch('/walks/{id}')
  @response(204, {
    description: 'Walk PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Walk, {partial: true}),
        },
      },
    })
    walk: Walk,
  ): Promise<void> {
    await this.walkRepository.updateById(id, walk);
  }

  @put('/walks/{id}')
  @response(204, {
    description: 'Walk PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() walk: Walk,
  ): Promise<void> {
    await this.walkRepository.replaceById(id, walk);
  }

  @del('/walks/{id}')
  @response(204, {
    description: 'Walk DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.walkRepository.deleteById(id);
  }
}
