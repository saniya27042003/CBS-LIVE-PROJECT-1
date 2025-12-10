import { Test, TestingModule } from '@nestjs/testing';
import { DecodeService } from './decode.service';

describe('DecodeService', () => {
  let service: DecodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecodeService],
    }).compile();

    service = module.get<DecodeService>(DecodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
