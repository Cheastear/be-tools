import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetMessagesFromIdDto {
  @IsString()
  @IsNotEmpty()
  chatId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  messageIdFrom?: number;
}
