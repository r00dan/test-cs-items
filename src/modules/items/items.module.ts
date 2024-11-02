import { Container } from "inversify";

import { ItemsToken } from "../../core/inversify-tokens";
import { ItemsRepository } from "./items.repository";
import { ItemsService } from "./items.service";
import { ItemsController } from "./items.controller";
import { ItemsRoutes } from "./items.routes";

const ItemsModule = new Container();

ItemsModule.bind<ItemsRepository>(ItemsToken.ItemsRepository).to(
  ItemsRepository
);
ItemsModule.bind<ItemsService>(ItemsToken.ItemsService).to(ItemsService);
ItemsModule.bind<ItemsController>(ItemsToken.ItemsController).to(
  ItemsController
);
ItemsModule.bind<ItemsRoutes>(ItemsToken.ItemsRoutes).to(ItemsRoutes);

export { ItemsModule };
