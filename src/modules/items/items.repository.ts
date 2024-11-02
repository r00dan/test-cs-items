import { injectable } from "inversify";

import { sql } from "../../core/database";

export interface Item {
  id: string;
  tradable: boolean;
  market_hash_name: string;
  currency: string;
  min_price: number;
  max_price: number;
  mean_price: number;
  quantity: number;
  created_at: number;
}

@injectable()
export class ItemsRepository {
  constructor() {}

  public async getPurchasableItemList() {
    const cacheKey = "purchasable_items";

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

    return result;
  }
}
