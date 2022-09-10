import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import {TokensModule} from "../tokens/tokens.module";
import {UsersModule} from "../users/users.module";
import {GmailModule} from "../gmail/gmail.module";
import { AuthenticationController } from './authentication.controller';
import {JwtStrategy} from "./strategy/jwt.strategy";

@Module({

  providers: [AuthenticationResolver, AuthenticationService,JwtStrategy,],
  imports:[TokensModule,UsersModule, GmailModule],
  controllers: [AuthenticationController],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
