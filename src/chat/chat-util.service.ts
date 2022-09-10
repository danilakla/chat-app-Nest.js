import {Inject, Injectable} from '@nestjs/common';

import {IORedisKey} from "../redis/redis.module";
import IORedis from "ioredis";

@Injectable()
export class ChatUtilService {
constructor( @Inject(IORedisKey) private readonly redisService: IORedis) {
}

  async parseFriendList  (friendList) {
    const newFriendList = [];
    for (let friend of friendList) {
      const parsedFriend = friend.split("//");
      const friendConnected = await this.redisService.hget(
          `socketId:${parsedFriend[0]}`,
          "connected"
      );
      newFriendList.push({
        email: parsedFriend[0],
        socketId: parsedFriend[1],
        connected: friendConnected,
      });
    }
    return newFriendList;
  };

}
