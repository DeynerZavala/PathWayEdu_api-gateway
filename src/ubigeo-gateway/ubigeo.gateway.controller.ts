import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/ubigeo')
export class UbigeoGatewayController {
  constructor(
    @Inject('MICROSERVICE_1') private readonly ubigeoClient: ClientProxy,
  ) {}

  // GET: Obtener todos los Ubigeos
  @Get()
  findAll(): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_all_ubigeos' }, {});
  }

  // GET: Obtener un Ubigeo por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_ubigeo_by_id' }, id);
  }

  // POST: Crear un nuevo Ubigeo
  @Post()
  create(@Body() ubigeo: { id: string; name: string }): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'create_ubigeo' }, ubigeo);
  }

  // GET: Obtener hijos de un Ubigeo
  @Get(':id/children')
  findChildren(@Param('id') id: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_children_by_ubigeo' }, id);
  }

  // DELETE: Eliminar un Ubigeo por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'delete_ubigeo' }, id);
  }
}
