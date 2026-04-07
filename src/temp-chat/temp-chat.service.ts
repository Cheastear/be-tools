import { Injectable, NotFoundException } from '@nestjs/common';
import { TempChat } from './entities/temp-chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from '../utils/rand-uuid';

@Injectable()
export class TempChatService {
  constructor(
    @InjectRepository(TempChat)
    private readonly repo: Repository<TempChat>,
  ) {}

  async create() {
    const chat = this.repo.create();

    let chatId: string;
    let exists: TempChat | null;

    do {
      chatId = uuid(8);
      exists = await this.repo.findOne({ where: { chatId } });
    } while (exists);

    const result = await this.repo.save(chat);
    return result;
  }

  async findOne(chat: Partial<TempChat>): Promise<TempChat> {
    const chatEntity = await this.repo.findOneBy(chat);
    if (!chatEntity) throw new NotFoundException('');

    return chatEntity;
  }

  remove(id: number) {
    return `This action removes a #${id} tempChat`;
  }
}
