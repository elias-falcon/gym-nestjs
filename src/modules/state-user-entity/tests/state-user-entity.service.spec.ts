import { Test, TestingModule } from '@nestjs/testing';
import { StateUserEntityService } from './state-user-entity.service';

describe('StateUserEntityService', () => {
  let service: StateUserEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateUserEntityService],
    }).compile();

    service = module.get<StateUserEntityService>(StateUserEntityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
