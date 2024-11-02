import axios from "axios";
import { sql } from "../../core/database";

async function getItems(tradableParam: number) {
  try {
    const response = await axios.get(
      `https://api.skinport.com/v1/items?tradable=${tradableParam}`
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function checkDataNotExist({ tradable }: { tradable: boolean }) {
  const count =
    await sql`select COUNT(*) from items where tradable = ${tradable}`;
  const result = Number(count[0].count);

  return result === 0;
}

export async function getTradableItemsAndPopulateDB() {
  try {
    const isPopulationNeeded = await checkDataNotExist({ tradable: true });

    if (isPopulationNeeded) {
      console.log("populating tradable items...");
      const items = await getItems(1);
      await sql.begin(async (sql) => {
        for (const item of items) {
          await sql`INSERT INTO items
          (tradable, market_hash_name, currency, min_price, max_price, mean_price, quantity)
          VALUES (${true}, ${item.market_hash_name}, ${item.currency}, ${
            item.min_price
          }, ${item.max_price}, ${item.mean_price}, ${item.quantity})`;
        }
      });
      console.log("tradable items successfully populated!");
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getNonTradableItemsAndPopulateDB() {
  try {
    const isPopulationNeeded = await checkDataNotExist({ tradable: false });

    if (isPopulationNeeded) {
      console.log("populating non tradable items...");
      const items = await getItems(1);
      await sql.begin(async (sql) => {
        for (const item of items) {
          await sql`INSERT INTO items
          (tradable, market_hash_name, currency, min_price, max_price, mean_price, quantity)
          VALUES (${false}, ${item.market_hash_name}, ${item.currency}, ${
            item.min_price
          }, ${item.max_price}, ${item.mean_price}, ${item.quantity})`;
        }
      });
      console.log("non tradable items successfully populated!");
    }
  } catch (error) {
    console.error(error);
  }
}
