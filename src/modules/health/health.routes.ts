import { Router } from "express";
import { inject, injectable } from "inversify";

import { HealthController } from "./health.controller";
import { HealthToken } from "../../core/inversify-tokens";

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
    /**
     * @swagger
     * /health:
     *   get:
     *     summary: Healthcheck endpoint
     *     tags: [Health]
     *     responses:
     *       200:
     *        description: Simple healthcheck response
     */
    this.router.get("/", (req, res) =>
      this.healthController.checkHealth(req, res)
    );
  }
}
