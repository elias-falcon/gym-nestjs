import { Test, TestingModule } from '@nestjs/testing';
import { StateUserEntityController } from '../state-user-entity.controller';

describe('StateUserEntity Controller', () => {
  let controller: StateUserEntityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateUserEntityController],
    }).compile();

    controller = module.get<StateUserEntityController>(StateUserEntityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
