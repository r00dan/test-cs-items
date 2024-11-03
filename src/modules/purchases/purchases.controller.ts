import { injectable, inject } from "inversify";
import { Request, Response } from "express";

import { PurchasesToken } from "../../core/inversify-tokens";
import { PurchasesService } from "./purchases.service";

@injectable()
export class PurchasesController {
  constructor(
    @inject(PurchasesToken.PurchasesService)
    private readonly purchasesService: PurchasesService
  ) {}

  public async getPurchases(req: Request, res: Response) {
    const userId = req.session.userId;
    console.log({ userId });

    try {
      const purchases = await this.purchasesService.getPurchases(userId);

      res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal error." });
    }
  }

  public async purchaseItem(req: Request, res: Response) {
    const itemId = req.params.id;
    const userId = req.session.userId;

    try {
      const { updatedUser } = await this.purchasesService.createPurchase(
        itemId,
        userId
      );

      res.status(200).json({ ...updatedUser, password: undefined });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal error." });
    }
  }
}
