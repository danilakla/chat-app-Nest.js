import { Module } from '@nestjs/common';
import { ChatMessageService } from './chat-message.service';
import { ChatMessageGateway } from './chat-message.gateway';
import {TokensModule} from "../tokens/tokens.module";

@Module({
  providers: [ChatMessageGateway, ChatMessageService],
  imports:[TokensModule]

})
export class ChatMessageModule {}
