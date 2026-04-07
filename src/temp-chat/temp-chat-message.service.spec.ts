import { Test, TestingModule } from '@nestjs/testing';
import { TempChatMessageService } from './temp-chat-message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from '../data.source';
import { TempChatMessage } from './entities/temp-chat-message.entity';

describe('TempChatMessageService', () => {
  let service: TempChatMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([TempChatMessage]),
      ],
      providers: [TempChatMessageService],
    }).compile();

    service = module.get<TempChatMessageService>(TempChatMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
