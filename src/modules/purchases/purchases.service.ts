import { injectable, inject } from "inversify";

import { sql } from "../../core/database";
import {
  ItemsToken,
  PurchasesToken,
  UsersToken,
} from "../../core/inversify-tokens";
import { PurchasesRepository } from "./purchases.repository";
import { UsersRepository } from "../users/users.repository";
import { ItemsRepository } from "../items/items.repository";

@injectable()
export class PurchasesService {
  constructor(
    @inject(PurchasesToken.PurchasesRepository)
    private readonly purchasesRepository: PurchasesRepository,
    @inject(UsersToken.UsersRepository)
    private readonly usersRepository: UsersRepository,
    @inject(ItemsToken.ItemsRepository)
    private readonly itemsRepository: ItemsRepository
  ) {}

  public async getPurchases(userId: string) {
    return await this.purchasesRepository.getPurchases(userId);
  }

  public async createPurchase(itemId: string, userId: string) {
    try {
      return await sql.begin(async (transaction) => {
        const item = await this.itemsRepository.getItemById(
          itemId,
          transaction
        );

        if (!item) {
          throw new Error("Item not found.");
        }

        const itemPrice = item.min_price;
        const isItemTradable = item.tradable;

        if (!isItemTradable) {
          throw new Error(`Item is not tradable.`);
        }

        const user = await this.usersRepository.getUserById(
          userId,
          transaction
        );
        const userBalance = user.balance;

        if (userBalance < itemPrice) {
          throw new Error(`Not enough money to buy this item.`);
        }

        const updatedUser = await this.usersRepository.withdrawFromBalance(
          userId,
          itemPrice,
          transaction
        );

        const purchase = await this.purchasesRepository.createPurchase(
          userId,
          itemId,
          transaction
        );

        return { updatedUser, purchase };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
