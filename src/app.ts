import express, { Application } from "express";

import { HealthModule } from "./modules/health/health.module";
import { HealthRoutes } from "./modules/health/health.routes";
import { HealthToken } from "./inversify-tokens";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    const healthRoutes = HealthModule.get<HealthRoutes>(
      HealthToken.HealthRoutes
    );
    this.app.use("/health", healthRoutes.router);
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
