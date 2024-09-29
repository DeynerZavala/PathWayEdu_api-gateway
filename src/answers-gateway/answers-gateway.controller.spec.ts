import { Test, TestingModule } from '@nestjs/testing';
import { AnswersGatewayController } from './answers-gateway.controller';

describe('AnswersGatewayController', () => {
  let controller: AnswersGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswersGatewayController],
    }).compile();

    controller = module.get<AnswersGatewayController>(AnswersGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
