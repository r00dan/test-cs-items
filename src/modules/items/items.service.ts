import { injectable, inject } from "inversify";

import { ItemsToken } from "../../core/inversify-tokens";
import { ItemsRepository } from "./items.repository";

@injectable()
export class ItemsService {
  constructor(
    @inject(ItemsToken.ItemsRepository)
    private readonly itemsRepository: ItemsRepository,
  ) {}

  public async getItemById(itemId: string) {
    return await this.itemsRepository.getItemById(itemId);
  }

  public async getPurchasableItemList() {
    return await this.itemsRepository.getPurchasableItemList();
  }
}
