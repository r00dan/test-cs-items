import { Request, Response } from "express";
import { injectable, inject } from "inversify";

import { HealthService } from "./health.service";
import { HealthToken } from "../../core/inversify-tokens";

@injectable()
export class HealthController {
  constructor(
    @inject(HealthToken.HealthService)
    private readonly healthService: HealthService
  ) {}

  public checkHealth(req: Request, res: Response) {
    const status = this.healthService.checkHealth();
    res.json(status);
  }
}
