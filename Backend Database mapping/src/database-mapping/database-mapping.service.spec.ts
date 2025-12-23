import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMappingService } from './database-mapping.service';

describe('DatabaseMappingService', () => {
  let service: DatabaseMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseMappingService],
    }).compile();

    service = module.get<DatabaseMappingService>(DatabaseMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
