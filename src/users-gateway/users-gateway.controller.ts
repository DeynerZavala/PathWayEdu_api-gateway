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

@Controller('api/users')
export class UsersGatewayController {
  constructor(
    @Inject('MICROSERVICE_1') private readonly microservice1Client: ClientProxy,
  ) {}

  // GET: Obtener todos los usuarios
  @Get()
  findAll(): Observable<any> {
    return this.microservice1Client.send({ cmd: 'get_users' }, {});
  }

  // GET: Obtener un usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.microservice1Client.send({ cmd: 'get_user_by_id' }, id);
  }

  // POST: Crear un nuevo usuario
  @Post()
  create(@Body() user: any): Observable<any> {
    return this.microservice1Client.send({ cmd: 'create_user' }, user);
  }

  // PUT: Actualizar un usuario por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() user: any): Observable<any> {
    return this.microservice1Client.send({ cmd: 'update_user' }, { id, user });
  }

  // DELETE: Eliminar un usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.microservice1Client.send({ cmd: 'delete_user' }, id);
  }

  // POST: Login de usuario
  @Post('login')
  login(
    @Body() credentials: { email: string; password: string },
  ): Observable<any> {
    return this.microservice1Client.send({ cmd: 'login_user' }, credentials);
  }
}
