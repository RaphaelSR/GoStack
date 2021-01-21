import { RedisOptions } from 'ioredis';

interface IChacheConfig{
    driver: 'redis';

    config: {
        redis:
    }

}
export default {
    driver: 'redis',

    config: {
        redis: {
            host: 'localhost',
            port: 6379,
            password: undefined,
        },
    },
} as IChacheConfig;