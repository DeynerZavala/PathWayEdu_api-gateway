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

@Controller('api/areas')
export class AreasGatewayController {
  constructor(
    @Inject('MICROSERVICE_2') private readonly client: ClientProxy, // Inyectamos el Microservicio 2
  ) {}

  // CREATE a new area
  @Post()
  create(@Body('areaName') areaName: string): Observable<any> {
    return this.client.send({ cmd: 'create_area' }, { areaName });
  }

  // READ all areas
  @Get()
  findAll(): Observable<any> {
    return this.client.send({ cmd: 'get_all_areas' }, {});
  }

  // READ one area by id
  @Get(':id')
  findOne(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'get_area_by_id' }, id);
  }

  // UPDATE an area by id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('areaName') areaName: string,
  ): Observable<any> {
    return this.client.send({ cmd: 'update_area' }, { id, areaName });
  }

  // DELETE an area by id
  @Delete(':id')
  remove(@Param('id') id: string): Observable<any> {
    return this.client.send({ cmd: 'delete_area' }, id);
  }
}
