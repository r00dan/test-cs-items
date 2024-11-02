import { injectable, inject } from "inversify";
import { Request, Response } from "express";

import { ItemsToken } from "../../core/inversify-tokens";
import { ItemsService } from "./items.service";

@injectable()
export class ItemsController {
  constructor(
    @inject(ItemsToken.ItemsService) private readonly itemsService: ItemsService
  ) {}

  public async getPurchasableItemList(req: Request, res: Response) {
    try {
      const itemsList = await this.itemsService.getPurchasableItemList();

      res.status(200).json(itemsList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal error." });
    }
  }
}
