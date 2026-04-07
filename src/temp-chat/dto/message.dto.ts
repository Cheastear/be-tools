import { IsNotEmpty, IsString } from 'class-validator';
import { TempChat } from '../entities/temp-chat.entity';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  chatId: TempChat['chatId'];

  @IsString()
  @IsNotEmpty()
  message: string;
}
