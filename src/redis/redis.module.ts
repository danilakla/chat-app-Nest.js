import {DynamicModule} from '@nestjs/common';
import {Module} from '@nestjs/common';
import IORedis from 'ioredis';

export const IORedisKey = 'IORedis';


@Module({})
export class RedisModule {
    static async registerAsync({useFactory}): Promise<DynamicModule> {


        const redisProvider = {
            provide: IORedisKey,
            useFactory: async () => {
                const { connectionOptions } = await useFactory();

                const client = await new IORedis(connectionOptions);

                return client;
            },
        };

        return {
            module: RedisModule,
            providers: [redisProvider],
            exports: [redisProvider],
            global:true,

        };
    }
}