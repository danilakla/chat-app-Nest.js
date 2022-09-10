import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket} from '@nestjs/websockets';
import {ChatService} from './chat.service';
import {CreateChatDto} from './dto/create-chat.dto';
import {Server, Socket} from "socket.io";
import {UseGuards} from "@nestjs/common";
import {WsJwtGuard} from "./guard/ws-jwt.guard";
import {ChatConnectedUserService} from "./chat-connected-user.service";


@WebSocketGateway({
    cors: {
        origin: '*',
        credentials: true

    }
})
export class ChatGateway {

    @WebSocketServer()
    server: Server

    constructor(private readonly chatService: ChatService,
                private readonly chatConnectedUserService: ChatConnectedUserService) {
    }


    @SubscribeMessage('init-user')
    @UseGuards(WsJwtGuard)
    async initial(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() socket: Socket,) {
        try {
            await this.chatService.initializeFriends(socket)

        } catch (e) {
            return e
        }

    }

    @SubscribeMessage('add_friend')
    @UseGuards(WsJwtGuard)
    async addFriend(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() socket: Socket,) {
        try {
            const isAdded = await this.chatConnectedUserService.addFriend(socket, createChatDto)
            socket.emit('isAdded', isAdded)
        } catch (e) {
            return e
        }

    }

    @SubscribeMessage('init-room-user')
    @UseGuards(WsJwtGuard)
    async initUserRoom(@MessageBody() createChatDto: CreateChatDto, @ConnectedSocket() socket: Socket,) {
        try {
            socket.join(socket.data.user.id.toString())

        } catch (e) {
            return e
        }

    }

    @SubscribeMessage('disconnect_user')
    @UseGuards(WsJwtGuard)
    async disconnect(@ConnectedSocket() socket: Socket,) {
        try {
            await this.chatService.onDisconnect(socket)

        }catch (e) {
            return e
        }
    }

}
