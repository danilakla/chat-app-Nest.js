import {Inject, Injectable} from '@nestjs/common';
import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";
import {ChatUtilService} from "./chat-util.service";

@Injectable()
export class ChatService {
    constructor(@Inject(IORedisKey) private readonly redisService: IORedis,
                private readonly chatUtilService: ChatUtilService) {
    }

    async initializeFriends(socket) {

        socket.join(socket.data.user.id);
        await this.redisService.hset(
            `socketId:${socket.data.user.email}`,
            "socketId",
            socket.data.user.id,
            "connected",
            'true'
        );


        const friendList = await this.redisService.lrange(
            `friends:${socket.data.user.email}`,
            0,
            -1
        );
        const parsedFriendList = await this.chatUtilService.parseFriendList(friendList);
        const friendRooms = parsedFriendList.map(friend => friend.socketId);

        if (friendRooms.length > 0)
            socket.to(friendRooms).emit("connected", true, socket.data.user.email);

        socket.emit("friends", parsedFriendList);


    };

    async onDisconnect(socket) {
        const email = socket.data.user.email
        await this.redisService.hset(
            `socketId:${email}`,
            "connected",
            'false'
        );
        const friendList = await this.redisService.lrange(
            `friends:${email}`,
            0,
            -1
        );
        const friendRooms = await this.chatUtilService.parseFriendList(friendList).then(friends =>
            friends.map(friend => friend.socketId)
        );
        socket.to(friendRooms).emit("disconnect_caller", {isConnected: false, email});
    };

}
