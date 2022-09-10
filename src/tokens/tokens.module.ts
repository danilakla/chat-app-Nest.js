import {Module} from '@nestjs/common';
import {TokensService} from './tokens.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tokens} from "./entities/token.entity";
import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";

@Module({
    providers: [TokensService],
    imports: [UsersModule, TypeOrmModule.forFeature([Tokens]), JwtModule.register({}),],
    exports: [TokensService]
})
export class TokensModule {
}
