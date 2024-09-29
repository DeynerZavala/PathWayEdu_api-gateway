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

@Controller('api/user-test-responses')
export class UserTestResponsesGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly microservice2Client: ClientProxy,
  ) {}

  // CREATE: Crear una nueva respuesta de prueba de usuario
  @Post()
  create(@Body() responseData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'create_user_test_response' },
      responseData,
    );
  }

  // READ all: Obtener todas las respuestas de prueba de usuario
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'get_all_user_test_responses' },
      {},
    );
  }

  // READ one: Obtener una respuesta de prueba de usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'get_user_test_response_by_id' },
      id,
    );
  }

  // UPDATE: Actualizar una respuesta de prueba de usuario por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'update_user_test_response' },
      { id, updateData },
    );
  }

  // DELETE: Eliminar una respuesta de prueba de usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'delete_user_test_response' },
      id,
    );
  }
}
