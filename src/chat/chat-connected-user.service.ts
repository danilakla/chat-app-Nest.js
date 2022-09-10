import { Inject, Injectable} from '@nestjs/common';

import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";
import {ChatUtilService} from "./chat-util.service";

@Injectable()
export class ChatConnectedUserService {
    constructor(@Inject(IORedisKey) private readonly redisService: IORedis,
                private readonly chatUtilService: ChatUtilService) {
    }

    async addFriend(socket,friendEmail){
        if (friendEmail === socket.data.user.email) {
            return false;

        }
        const friend = await this.redisService.hgetall(`socketId:${friendEmail}`);
        const currentFriendList = await this.redisService.lrange(
            `friends:${socket.data.user.email}`,
            0,
            -1
        );

        if (!friend.socketId) {
            return false;
        }
        if (
            currentFriendList &&
            currentFriendList.indexOf(`${friendEmail}.${friend.socketId}`) !== -1
        ) {
            return false;
        }

        await this.redisService.lpush(
            `friends:${socket.data.user.email}`,
            [friendEmail, friend.socketId].join("//")
        );


        return true
    }



}
