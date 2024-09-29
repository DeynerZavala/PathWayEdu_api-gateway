import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsGatewayController } from './questions-gateway.controller';

describe('QuestionsGatewayController', () => {
  let controller: QuestionsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsGatewayController],
    }).compile();

    controller = module.get<QuestionsGatewayController>(QuestionsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
