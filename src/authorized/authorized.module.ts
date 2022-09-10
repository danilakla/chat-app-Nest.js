import { Module } from '@nestjs/common';
import { AuthorizedService } from './authorized.service';
import { AuthorizedResolver } from './authorized.resolver';
import {TokensModule} from "../tokens/tokens.module";
import {UsersModule} from "../users/users.module";

@Module({
  providers: [AuthorizedResolver, AuthorizedService],
  imports:[TokensModule, UsersModule]
})
export class AuthorizedModule {}
