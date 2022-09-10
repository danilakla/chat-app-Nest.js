import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSource} from "../ormconfig";
import {UsersModule} from './users/users.module';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {RolesModule} from './roles/roles.module';
import {TokensModule} from './tokens/tokens.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {RedisModule} from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { GmailModule } from './gmail/gmail.module';
import { AuthorizedModule } from './authorized/authorized.module';
import { OAuth2Module } from './OAuth2/OAuth2.module';
import { ChatModule } from './chat/chat.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ProfileModule } from './profile/profile.module';
import { FileLoaderModule } from './file-loader/file-loader.module';


@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`,
        isGlobal: true,
    }), TypeOrmModule.forRoot(AppDataSource.options),
        UsersModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            cors: {
                credentials: true,
                origin: true
            },
            context: ({ req, res }) => ({ req, res })
        }),
        RolesModule,
        TokensModule,
        AuthenticationModule,
        RedisModule.registerAsync({
            useFactory: async () => {

                return {
                    connectionOptions: {
                        host: process.env.HOST_REDIS,
                        port: process.env.PORT_REDIS,
                    }
                };
            },
        }),
        MailModule,
        GmailModule,
        AuthorizedModule,
        OAuth2Module,
        ChatModule,
        ChatMessageModule,
        ProfileModule,
        FileLoaderModule,],

})
export class AppModule {
}
