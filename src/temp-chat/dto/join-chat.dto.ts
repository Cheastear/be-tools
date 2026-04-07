import { IsNotEmpty, IsString } from 'class-validator';
import { TempChat } from '../entities/temp-chat.entity';

export class JoinChatDto {
  @IsString()
  @IsNotEmpty()
  chatId: TempChat['chatId'];

  @IsString()
  @IsNotEmpty()
  username: string;
}
