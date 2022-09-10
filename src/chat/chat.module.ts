import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import {ChatUtilService} from "./chat-util.service";
import {TokensModule} from "../tokens/tokens.module";
import {ChatConnectedUserService} from "./chat-connected-user.service";

@Module({
  providers: [ChatGateway, ChatService,ChatUtilService,ChatConnectedUserService],
imports:[TokensModule]
})
export class ChatModule {}
