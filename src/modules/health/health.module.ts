import { Container } from "inversify";

import { HealthToken } from "../../core/inversify-tokens";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { HealthRoutes } from "./health.routes";

const HealthModule = new Container();

HealthModule.bind<HealthService>(HealthToken.HealthService).to(HealthService);
HealthModule.bind<HealthController>(HealthToken.HealthController).to(
  HealthController
);
HealthModule.bind<HealthRoutes>(HealthToken.HealthRoutes).to(HealthRoutes);

export { HealthModule };
