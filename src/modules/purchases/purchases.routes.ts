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
    /**
     * @swagger
     * /purchase:
     *   get:
     *     summary: List user's purchases
     *     tags: [Purchases]
     *     responses:
     *       200:
     *        description: Shows list of user's purchases
     */
    this.router.get("/", isAuthenticated, (req, res) =>
      this.purchasesController.getPurchases(req, res)
    );
    /**
     * @swagger
     * /purchase/item/:id:
     *   post:
     *     summary: Purchase an item
     *     tags: [Purchases]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Item ID
     *     responses:
     *       201:
     *         description: Successful purchase
     *       401:
     *         description: Unauthorized.
     */
    this.router.post("/item/:id", isAuthenticated, (req, res) =>
      this.purchasesController.purchaseItem(req, res)
    );
  }
}
