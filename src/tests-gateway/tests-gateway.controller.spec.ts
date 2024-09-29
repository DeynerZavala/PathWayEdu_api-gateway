import { Test, TestingModule } from '@nestjs/testing';
import { TestsGatewayController } from './tests-gateway.controller';

describe('TestsGatewayController', () => {
  let controller: TestsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsGatewayController],
    }).compile();

    controller = module.get<TestsGatewayController>(TestsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
