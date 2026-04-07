import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { DefaultEventsMap, Server, Socket } from 'socket.io';
import { TempChatService } from './temp-chat.service';
import { MessageDto } from './dto/message.dto';
import { TempChatMessageService } from './temp-chat-message.service';
import { JoinChatDto } from './dto/join-chat.dto';
import { WS_EVENTS } from '../utils/constants';

interface TempChatSocketData {
  username?: string;
}

type TempChatSocket = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  TempChatSocketData
>;

@WebSocketGateway({ namespace: '/temp-chat', cors: true })
export class TempChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly tempChatService: TempChatService,
    private readonly tempChatMessageService: TempChatMessageService,
  ) {}

  @SubscribeMessage('joinChat')
  async handleJoin(
    @ConnectedSocket() client: TempChatSocket,
    @MessageBody() { chatId, username }: JoinChatDto,
  ) {
    TempChatGateway.validateUsername(username);

    client.data.username = username;

    const chat = await this.tempChatService.findOne({ chatId: chatId });
    if (!chat) throw new WsException('Chat with this id does not exist');

    void client.join(`chat:${chatId}`);

    const saved = await this.tempChatMessageService.create({
      chat: chat,
      message: `User '${username}' connect to the chat.`,
      author: "'system'",
    });

    this.server.to(`chat:${chatId}`).emit(WS_EVENTS.NEW_MESSAGE, saved);
  }

  @SubscribeMessage('message')
  async message(
    @ConnectedSocket() client: TempChatSocket,
    @MessageBody() { chatId, message }: MessageDto,
  ) {
    TempChatGateway.validateUsername(client.data.username);

    const chat = await this.tempChatService.findOne({ chatId: chatId });
    if (!chat) throw new WsException('Chat with this id does not exist');

    const saved = await this.tempChatMessageService.create({
      chat: chat,
      message,
      author: client.data.username!,
    });

    this.server.to(`chat:${chatId}`).emit(WS_EVENTS.NEW_MESSAGE, saved);

    return this.tempChatService.findOne({ chatId });
  }

  private static validateUsername(username?: string) {
    if (!username) throw new WsException("User don't have an username");
  }
}
