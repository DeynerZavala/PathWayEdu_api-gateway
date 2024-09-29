import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResultsGatewayController } from './user-test-results-gateway.controller';

describe('UserTestResultsGatewayController', () => {
  let controller: UserTestResultsGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestResultsGatewayController],
    }).compile();

    controller = module.get<UserTestResultsGatewayController>(UserTestResultsGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
