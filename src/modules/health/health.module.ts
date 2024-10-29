import { Container } from "inversify";

import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import { HealthRoutes } from "./health.routes";
import { HealthToken } from "../../inversify-tokens";

const HealthModule = new Container();

HealthModule.bind<HealthService>(HealthToken.HealthService).to(HealthService);
HealthModule.bind<HealthController>(HealthToken.HealthController).to(
  HealthController
);
HealthModule.bind<HealthRoutes>(HealthToken.HealthRoutes).to(HealthRoutes);

export { HealthModule };
