import { IsNotEmpty, IsString } from 'class-validator';
import { TempChat } from '../entities/temp-chat.entity';
import { TempChatMessage } from '../entities/temp-chat-message.entity';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  author: TempChatMessage['author'];

  @IsString()
  @IsNotEmpty()
  chat: TempChat;

  @IsString()
  @IsNotEmpty()
  message: string;
}
