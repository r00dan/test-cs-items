import { injectable } from "inversify";
import postgres from "postgres";

import { sql } from "../../core/database";
import { PurchaseModel } from "./purchases.model";

@injectable()
export class PurchasesRepository {
  constructor() {}

  public async getPurchases(userId: string) {
    const purchases = await sql<
      PurchaseModel[]
    >`select * from purchases where user_id=${userId}`;

    return purchases;
  }

  public async createPurchase(
    userId: string,
    itemId: string,
    transaction?: postgres.TransactionSql
  ) {
    const [purchase] = transaction
      ? await transaction<PurchaseModel[]>`
      insert into purchases (user_id, item_id) 
      values (${userId}, ${itemId}) 
      returning *
    `
      : await sql<PurchaseModel[]>`
      insert into purchases (user_id, item_id) 
      values (${userId}, ${itemId}) 
      returning *
    `;
    return purchase;
  }
}
