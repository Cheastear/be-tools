import { Test, TestingModule } from '@nestjs/testing';
import { TempChatService } from './temp-chat.service';

describe('TempChatService', () => {
  let service: TempChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempChatService],
    }).compile();

    service = module.get<TempChatService>(TempChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
