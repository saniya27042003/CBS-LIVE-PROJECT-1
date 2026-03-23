/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMappingService } from './database-mapping.service';
import { describe, beforeEach, it } from 'node:test';

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

// removed local expect helper to avoid shadowing the testing framework's global expect

