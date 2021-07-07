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
import {Skin} from '../models';
import {SkinRepository} from '../repositories';

export class SkinController {
  constructor(
    @repository(SkinRepository)
    public skinRepository : SkinRepository,
  ) {}

  @post('/skins')
  @response(200, {
    description: 'Skin model instance',
    content: {'application/json': {schema: getModelSchemaRef(Skin)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skin, {
            title: 'NewSkin',
            exclude: ['_id'],
          }),
        },
      },
    })
    skin: Omit<Skin, '_id'>,
  ): Promise<Skin> {
    return this.skinRepository.create(skin);
  }

  @get('/skins/count')
  @response(200, {
    description: 'Skin model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Skin) where?: Where<Skin>,
  ): Promise<Count> {
    return this.skinRepository.count(where);
  }

  @get('/skins')
  @response(200, {
    description: 'Array of Skin model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Skin, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Skin) filter?: Filter<Skin>,
  ): Promise<Skin[]> {
    return this.skinRepository.find(filter);
  }

  @patch('/skins')
  @response(200, {
    description: 'Skin PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skin, {partial: true}),
        },
      },
    })
    skin: Skin,
    @param.where(Skin) where?: Where<Skin>,
  ): Promise<Count> {
    return this.skinRepository.updateAll(skin, where);
  }

  @get('/skins/{id}')
  @response(200, {
    description: 'Skin model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Skin, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Skin, {exclude: 'where'}) filter?: FilterExcludingWhere<Skin>
  ): Promise<Skin> {
    return this.skinRepository.findById(id, filter);
  }

  @patch('/skins/{id}')
  @response(204, {
    description: 'Skin PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skin, {partial: true}),
        },
      },
    })
    skin: Skin,
  ): Promise<void> {
    await this.skinRepository.updateById(id, skin);
  }

  @put('/skins/{id}')
  @response(204, {
    description: 'Skin PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() skin: Skin,
  ): Promise<void> {
    await this.skinRepository.replaceById(id, skin);
  }

  @del('/skins/{id}')
  @response(204, {
    description: 'Skin DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.skinRepository.deleteById(id);
  }
}
