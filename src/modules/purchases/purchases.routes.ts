import { Router } from "express";
import { inject, injectable } from "inversify";

import { PurchasesToken } from "../../core/inversify-tokens";
import { PurchasesController } from "./purchases.controller";
import { isAuthenticated } from "../../core/middlewares/is-authenticated.middleware";

@injectable()
export class PurchasesRoutes {
  public router: Router;

  constructor(
    @inject(PurchasesToken.PurchasesController)
    private purchasesController: PurchasesController
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/", isAuthenticated, (req, res) =>
      this.purchasesController.getPurchases(req, res)
    );
    this.router.post("/item/:id", isAuthenticated, (req, res) =>
      this.purchasesController.purchaseItem(req, res)
    );
  }
}
