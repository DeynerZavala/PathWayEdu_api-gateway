// area-centro-de-estudio-gateway.controller.ts
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

@Controller('api/area-centro-de-estudios')
export class AreaCentroDeEstudioGatewayController {
  constructor(
    @Inject('MICROSERVICE_3')
    private readonly client: ClientProxy,
  ) {}

  // CREATE: Crear una nueva AreaCentroDeEstudio con ubicación
  @Post()
  create(
    @Body() area: { area_id: string; ubicacion: string; centroDeEstudio: any },
  ): Observable<any> {
    return this.client.send({ cmd: 'create_area_centro_de_estudio' }, area);
  }

  // READ: Obtener todas las áreas de centro de estudio
  @Get()
  findAll(): Observable<any> {
    return this.client.send({ cmd: 'get_all_areas_centro_de_estudio' }, {});
  }

  // READ: Obtener un AreaCentroDeEstudio por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'get_area_centro_de_estudio_by_id' }, id);
  }

  // UPDATE: Actualizar un AreaCentroDeEstudio con ubicación
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() area: Partial<{ area_id: string; ubicacion: string }>,
  ): Observable<any> {
    return this.client.send(
      { cmd: 'update_area_centro_de_estudio' },
      { id, ...area },
    );
  }

  // DELETE: Eliminar un AreaCentroDeEstudio por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'delete_area_centro_de_estudio' }, id);
  }
}
