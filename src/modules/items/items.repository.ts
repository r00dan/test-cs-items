import { injectable } from "inversify";
import { Redis } from "ioredis";
import postgres from "postgres";

import { sql } from "../../core/database";
import { Cache } from "../../core/cache";
import { ItemModel } from "./items.model";

@injectable()
export class ItemsRepository {
  private readonly cacheKey = "purchasable_items";
  private readonly redis: Redis;

  constructor() {
    this.redis = Cache.getInstance().redis;
  }

  public async getItemById(id: string, transaction?: postgres.TransactionSql) {
    const users = transaction
      ? await transaction<
          ItemModel[]
        >`select * from items where id=${id} limit 1`
      : await sql<ItemModel[]>`select * from items where id=${id} limit 1`;
    return users[0] || null;
  }

  public async getPurchasableItemList() {
    const cachedData = await this.getFromCache();

    if (!cachedData) {
      const result = await sql`
        with MinPrices as (
            select
                market_hash_name,
                min(case when tradable = true then min_price end) as tradable_min_price,
                min(case when tradable = false then min_price end) as non_tradable_min_price
            from items
            where min_price is not null
            group by market_hash_name
        )
        select 
            (select id from items i where i.market_hash_name = mp.market_hash_name and i.tradable = true and i.min_price = mp.tradable_min_price limit 1) as tradable_item_id,
            mp.market_hash_name as name,
            mp.tradable_min_price,
            mp.non_tradable_min_price
        from MinPrices mp;
      `;

      await this.redis.set(this.cacheKey, JSON.stringify(result));

      return result;
    }

    return cachedData;
  }

  private async getFromCache() {
    try {
      const rawData = await this.redis.get(this.cacheKey);

      return rawData ? JSON.parse(rawData) : undefined;
    } catch (error) {
      console.error(error);
    }
  }
}
