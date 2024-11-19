import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersGatewayController } from './users-gateway/users-gateway.controller';
import { RoleGatewayController } from './role-gateway/role-gateway.controller';
import { GenderGatewayController } from './gender-gateway/gender-gateway.controller';
import { AnswersGatewayController } from './answers-gateway/answers-gateway.controller';
import { AreasGatewayController } from './areas-gateway/areas-gateway.controller';
import { QuestionsGatewayController } from './questions-gateway/questions-gateway.controller';
import { TestsGatewayController } from './tests-gateway/tests-gateway.controller';
import { UserTestResponsesGatewayController } from './user-test-responses-gateway/user-test-responses-gateway.controller';
import { UserTestResultsGatewayController } from './user-test-results-gateway/user-test-results-gateway.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_1', // Microservicio para usuarios
        transport: Transport.TCP,
        options: {
          host: 'ms1',
          port: 3001, // El puerto donde corre Microservicio 1
        },
      },
      {
        name: 'MICROSERVICE_2', // Microservicio para roles y géneros
        transport: Transport.TCP,
        options: {
          host: 'ms2',
          port: 3002, // El puerto donde corre Microservicio 2
        },
      },
      {
        name: 'MICROSERVICE_3', // Microservicio para usuarios
        transport: Transport.TCP,
        options: {
          host: 'ms3',
          port: 3003, // El puerto donde corre Microservicio 3
        },
      },
    ]),
  ],
  controllers: [
    UsersGatewayController,
    RoleGatewayController,
    GenderGatewayController,
    AnswersGatewayController,
    AreasGatewayController,
    QuestionsGatewayController,
    TestsGatewayController,
    UserTestResponsesGatewayController,
    UserTestResultsGatewayController,
  ],
})
export class AppModule {}
