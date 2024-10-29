import { Router } from "express";
import { inject, injectable } from "inversify";

import { HealthController } from "./health.controller";
import { HealthToken } from "../../inversify-tokens";

@injectable()
export class HealthRoutes {
  public router: Router;

  constructor(
    @inject(HealthToken.HealthController)
    private healthController: HealthController
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/", (req, res) =>
      this.healthController.checkHealth(req, res)
    );
  }
}
