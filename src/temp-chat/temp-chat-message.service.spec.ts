import { Test, TestingModule } from '@nestjs/testing';
import { TempChatMessageService } from './temp-chat-message.service';

describe('TempChatMessageService', () => {
  let service: TempChatMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempChatMessageService],
    }).compile();

    service = module.get<TempChatMessageService>(TempChatMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
