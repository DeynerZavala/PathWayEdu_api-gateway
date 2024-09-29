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

@Controller('api/tests')
export class TestsGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly microservice2Client: ClientProxy,
  ) {}

  // GET: Obtener todas las pruebas
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_all_tests' }, {});
  }

  // GET: Obtener una prueba por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_test_by_id' }, id);
  }

  // POST: Crear una nueva prueba
  @Post()
  create(@Body() testData: any): Observable<any> {
    return this.microservice2Client.send({ cmd: 'create_test' }, testData);
  }

  // PUT: Actualizar una prueba por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() testData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'update_test' },
      { id, testData },
    );
  }

  // DELETE: Eliminar una prueba por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send({ cmd: 'delete_test' }, id);
  }

  // GET: Obtener una prueba por un ID personalizado (rango de pruebas)
  @Get('all/:id')
  getTestByCustomId(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_test_by_custom_id' }, id);
  }
}
