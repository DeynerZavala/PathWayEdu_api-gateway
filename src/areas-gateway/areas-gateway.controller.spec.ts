import { Test, TestingModule } from '@nestjs/testing';
import { AreasGatewayController } from './areas-gateway.controller';

describe('AreasGatewayController', () => {
  let controller: AreasGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreasGatewayController],
    }).compile();

    controller = module.get<AreasGatewayController>(AreasGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
