import {Inject, Injectable} from '@nestjs/common';
import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";

@Injectable()
export class ChatMessageService {
    constructor(@Inject(IORedisKey) private readonly redisService: IORedis) {
    }

    async create(message, socket) {
        message.from = socket.data.user.id;

        const messageString = [message.to, message.from, message.message].join(
            "$//$"
        );
        await this.redisService.lpush(`chat:${message.to}`
            , messageString);
        await this.redisService.lpush(`chat:${message.from}`, messageString);
        return message
    }

    async initMessageInRoom(socket, friendId) {
        const socketId = socket.data.user.id.toString()
        const msgQuery = await this.redisService.lrange(
            `chat:${socketId}`,
            0,
            -1);

        const messages = msgQuery.map(msgStr => {
            const parsedStr = msgStr.split("$//$");
            return {to: parsedStr[0], from: parsedStr[1], message: parsedStr[2]};
        });
        const roomMessages = messages.filter((message) => {
            if ((message.from === friendId || message.to === friendId)) {
                return true
            }
        })
        if (roomMessages && roomMessages.length > 0) {
            socket.emit("messages", roomMessages);
        }
    }
}
