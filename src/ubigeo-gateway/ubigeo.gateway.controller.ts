import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('api/ubigeo')
export class UbigeoGatewayController {
  constructor(
    @Inject('MICROSERVICE_1') private readonly ubigeoClient: ClientProxy,
  ) {}

  @Get('countries')
  getCountries(): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_countries' }, {});
  }

  @Get('departamentos/:countryId')
  getDepartamentos(@Param('countryId') countryId: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_departamentos' }, countryId);
  }

  @Get('provincias/:departmentId')
  getProvincias(@Param('departmentId') departmentId: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_provincias' }, departmentId);
  }

  @Get('ciudades/:provinceId')
  getCiudades(@Param('provinceId') provinceId: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'get_ciudades' }, provinceId);
  }

  @Get(':id')
  findUbigeo(@Param('id') id: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'find_ubigeo' }, id);
  }

  @Get('children/:parentId')
  findChildren(@Param('parentId') parentId: string): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'find_children' }, parentId);
  }

  @Post()
  createUbigeo(@Body() data: { id: string; name: string }): Observable<any> {
    return this.ubigeoClient.send({ cmd: 'create_ubigeo' }, data);
  }

  @Delete(':id')
  deleteUbigeo(@Param('id') id: string): Observable<void> {
    return this.ubigeoClient.send({ cmd: 'delete_ubigeo' }, id);
  }
}
