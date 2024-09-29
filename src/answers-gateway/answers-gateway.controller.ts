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

@Controller('api/answers')
export class AnswersGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly client: ClientProxy, // Conexión al Microservicio 2
  ) {}

  // CREATE
  @Post()
  create(@Body() answerData: any): Observable<any> {
    return this.client.send({ cmd: 'create_answer' }, answerData);
  }

  // READ all
  @Get()
  findAll(): Observable<any> {
    return this.client.send({ cmd: 'get_all_answers' }, {});
  }

  // READ one
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'get_answer_by_id' }, id);
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any): Observable<any> {
    return this.client.send({ cmd: 'update_answer' }, { id, updateData });
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'delete_answer' }, id);
  }
}
