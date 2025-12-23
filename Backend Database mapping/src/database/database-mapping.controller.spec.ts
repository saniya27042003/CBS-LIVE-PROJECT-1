import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMappingController } from '../database-mapping/database-mapping.controller';

describe('DatabaseMappingController', () => {
  let controller: DatabaseMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseMappingController],
    }).compile();

    controller = module.get<DatabaseMappingController>(
      DatabaseMappingController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
