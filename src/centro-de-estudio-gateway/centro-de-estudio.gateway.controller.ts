// centro-de-estudio-gateway.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/centro-de-estudios')
export class CentroDeEstudioGatewayController {
  constructor(@Inject('MICROSERVICE_3') private readonly client: ClientProxy) {}

  // CREATE: Crear un nuevo CentroDeEstudio con los nuevos campos
  @Post()
  create(
    @Body()
    centro: {
      nombre: string;
      globalRanking: string;
      nationalRanking: string;
      link: string;
      image: string;
    },
  ): Observable<any> {
    return this.client.send({ cmd: 'create_centro_de_estudio' }, centro);
  }

  // READ: Obtener todos los centros de estudio
  @Get()
  findAll(): Observable<any> {
    return this.client.send({ cmd: 'get_all_centros_de_estudio' }, {});
  }

  // READ: Obtener un CentroDeEstudio por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'get_centro_de_estudio_by_id' }, id);
  }

  // UPDATE: Actualizar un CentroDeEstudio por ID, incluyendo los nuevos campos
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    centro: Partial<{
      nombre: string;
      globalRanking: string;
      nationalRanking: string;
      link: string;
      image: string;
    }>,
  ): Observable<any> {
    return this.client.send(
      { cmd: 'update_centro_de_estudio' },
      { id, ...centro },
    );
  }

  // DELETE: Eliminar un CentroDeEstudio por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'delete_centro_de_estudio' }, id);
  }
}
