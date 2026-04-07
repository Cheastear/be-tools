import { Body, Controller, Get } from '@nestjs/common';
import { TempChatMessageService } from './temp-chat-message.service';
import { TempChatService } from './temp-chat.service';
import { GetMessagesFromIdDto } from './dto/get-messages-from-id.dto';

@Controller('temp-chat')
export class TempChatController {
  constructor(
    private readonly messageService: TempChatMessageService,
    private readonly chatService: TempChatService,
  ) {}

  @Get('messages-from-id')
  async messagesFromId(@Body() body: GetMessagesFromIdDto) {
    return await this.messageService.getMessagesFromId(body);
  }
}
