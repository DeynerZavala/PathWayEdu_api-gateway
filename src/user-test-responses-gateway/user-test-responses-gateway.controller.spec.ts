import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResponsesGatewayController } from './user-test-responses-gateway.controller';

describe('UserTestResponsesGatewayController', () => {
  let controller: UserTestResponsesGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestResponsesGatewayController],
    }).compile();

    controller = module.get<UserTestResponsesGatewayController>(UserTestResponsesGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
