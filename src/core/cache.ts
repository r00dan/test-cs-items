import { Redis } from "ioredis";

export class Cache {
  public readonly redis: Redis;
  private static instance: Cache;

  private constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });
  }

  public static getInstance() {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }

    return Cache.instance;
  }
}
