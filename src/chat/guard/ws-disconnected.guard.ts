import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

import {ChatService} from "../chat.service";


@Injectable()
export class WsDisconnectedGuard implements CanActivate {

    constructor(private chatService:ChatService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const client: Socket = context.switchToWs().getClient<Socket>();
            console.log(client)
           await this.chatService.onDisconnect(client)
            return true
        } catch (err) {
            throw new WsException(err.message);
        }
    }
}
