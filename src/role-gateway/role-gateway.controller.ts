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

@Controller('api/role')
export class RoleGatewayController {
  constructor(
    @Inject('MICROSERVICE_1') private readonly microservice2Client: ClientProxy,
  ) {}

  // GET: Obtener todos los roles
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_roles' }, {});
  }

  // GET: Obtener un rol por ID
  @Get(':id')
  findOne(@Param('id') id: number): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_role_by_id' }, id);
  }

  // POST: Crear un nuevo rol
  @Post()
  create(@Body() role: any): Observable<any> {
    return this.microservice2Client.send({ cmd: 'create_role' }, role);
  }

  // PUT: Actualizar un rol por ID
  @Put(':id')
  update(@Param('id') id: number, @Body() role: Partial<any>): Observable<any> {
    return this.microservice2Client.send({ cmd: 'update_role' }, { id, role });
  }

  // DELETE: Eliminar un rol por ID
  @Delete(':id')
  remove(@Param('id') id: number): Observable<any> {
    return this.microservice2Client.send({ cmd: 'delete_role' }, id);
  }
}
