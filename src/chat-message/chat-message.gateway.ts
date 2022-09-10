import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket} from '@nestjs/websockets';
import {ChatMessageService} from './chat-message.service';
import {CreateChatMessageDto} from './dto/create-chat-message.dto';
import {Server, Socket} from "socket.io";
import {UseGuards} from "@nestjs/common";
import {WsJwtGuard} from "../chat/guard/ws-jwt.guard";

@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true

    }
})
export class ChatMessageGateway {

    @WebSocketServer()
    server: Server
    constructor(private readonly chatMessageService: ChatMessageService) {
    }


    @SubscribeMessage('create-message')
    @UseGuards(WsJwtGuard)
    async create(@MessageBody() createChatMessageDto: CreateChatMessageDto,@ConnectedSocket() socket: Socket) {
        try {
            const message= await this.chatMessageService.create(createChatMessageDto,socket);
            socket.to(message.to.toString()).emit('take-message',message)
        }catch (e) {
            return e
        }


    }

    @SubscribeMessage('init-message')
    @UseGuards(WsJwtGuard)
    initMessage(@MessageBody() friendId,@ConnectedSocket() socket: Socket) {
        try {
            return this.chatMessageService.initMessageInRoom(socket,friendId,);

        }catch (e) {
            return e
        }
    }
}
