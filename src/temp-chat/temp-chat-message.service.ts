import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TempChatMessage } from './entities/temp-chat-message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class TempChatMessageService {
  constructor(
    @InjectRepository(TempChatMessage)
    private readonly repo: Repository<TempChatMessage>,
  ) {}

  async create(message: CreateMessageDto) {
    const newMessage = this.repo.create({
      chat: message.chat,
      text: message.message,
      author: message.author,
    });

    return await this.repo.save(newMessage);
  }
}
