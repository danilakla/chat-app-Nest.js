import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import {TokensService} from "../../tokens/tokens.service";


@Injectable()
export class WsJwtGuard implements CanActivate {

    constructor(private tokensService: TokensService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const client: Socket = context.switchToWs().getClient<Socket>();
            const authToken = client.handshake.auth.token;
            const user = await this.tokensService.validationAccessToken(authToken);
            client.data.user=user;
            context.switchToHttp().getRequest().user = user
            return user
        } catch (err) {
            throw new WsException(err.message);
        }
    }
}
