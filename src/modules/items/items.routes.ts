import { Router } from "express";
import { inject, injectable } from "inversify";

import { ItemsToken } from "../../core/inversify-tokens";
import { ItemsController } from "./items.controller";

@injectable()
export class ItemsRoutes {
  public router: Router;

  constructor(
    @inject(ItemsToken.ItemsController)
    private itemsController: ItemsController
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    /**
     * @swagger
     * /item:
     *   get:
     *     summary: List items
     *     tags: [Items]
     *     responses:
     *       200:
     *        description: Shows list of items with price
     */
    this.router.get("/", (req, res) =>
      this.itemsController.getPurchasableItemList(req, res)
    );
  }
}
