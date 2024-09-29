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

@Controller('api/user-test-results')
export class UserTestResultsGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly microservice2Client: ClientProxy,
  ) {}

  // CREATE: Crear un nuevo resultado de prueba de usuario
  @Post()
  create(@Body() resultData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'create_user_test_result' },
      resultData,
    );
  }

  // READ all: Obtener todos los resultados de prueba de usuario
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'get_all_user_test_results' },
      {},
    );
  }

  // READ one: Obtener un resultado de prueba de usuario por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'get_user_test_result_by_id' },
      id,
    );
  }

  // UPDATE: Actualizar un resultado de prueba de usuario por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'update_user_test_result' },
      { id, updateData },
    );
  }

  // DELETE: Eliminar un resultado de prueba de usuario por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'delete_user_test_result' },
      id,
    );
  }

  // POST: Enviar respuestas de prueba de usuario para obtener un resultado
  @Post('submit')
  submitTestResponses(@Body() body: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'submit_test_responses' },
      body,
    );
  }
}
