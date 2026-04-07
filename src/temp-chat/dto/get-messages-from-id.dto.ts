import { IsNotEmpty, IsString } from 'class-validator';

export class GetMessagesFromIdDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  messageIdFrom: number;
}
