import { Test, TestingModule } from '@nestjs/testing';
import { TempChatService } from './temp-chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../data.source';
import { TempChat } from './entities/temp-chat.entity';

describe('TempChatService', () => {
  let service: TempChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([TempChat]),
      ],
      providers: [TempChatService],
    }).compile();

    service = module.get<TempChatService>(TempChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
