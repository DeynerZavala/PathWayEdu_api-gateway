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

@Controller('api/gender')
export class GenderGatewayController {
  constructor(
    @Inject('MICROSERVICE_1') private readonly microservice2Client: ClientProxy, // Asumiendo que MICROSERVICE_2 maneja los géneros
  ) {}

  // GET: Obtener todos los géneros
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_genders' }, {});
  }

  // GET: Obtener un género por ID
  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_gender_by_id' }, id);
  }

  // POST: Crear un nuevo género
  @Post()
  create(@Body() gender: any): Observable<any> {
    return this.microservice2Client.send({ cmd: 'create_gender' }, gender);
  }

  // PUT: Actualizar un género por ID
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() gender: Partial<any>,
  ): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'update_gender' },
      { id, gender },
    );
  }

  // DELETE: Eliminar un género por ID
  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    return this.microservice2Client.send({ cmd: 'delete_gender' }, id);
  }
}
