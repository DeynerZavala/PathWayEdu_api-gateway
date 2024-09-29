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

@Controller('api/questions')
export class QuestionsGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly microservice2Client: ClientProxy,
  ) {}

  // GET: Obtener todas las preguntas
  @Get()
  findAll(): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_all_questions' }, {});
  }

  // GET: Obtener una pregunta por ID
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send({ cmd: 'get_question_by_id' }, id);
  }

  // POST: Crear una nueva pregunta
  @Post()
  create(@Body() questionData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'create_question' },
      questionData,
    );
  }

  // PUT: Actualizar una pregunta por ID
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any): Observable<any> {
    return this.microservice2Client.send(
      { cmd: 'update_question' },
      { id, updateData },
    );
  }

  // DELETE: Eliminar una pregunta por ID
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.microservice2Client.send({ cmd: 'delete_question' }, id);
  }
}
