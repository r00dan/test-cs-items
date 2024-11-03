import { Container } from "inversify";

import {
  ItemsToken,
  PurchasesToken,
  UsersToken,
} from "../../core/inversify-tokens";
import { PurchasesRepository } from "./purchases.repository";
import { PurchasesController } from "./purchases.controller";
import { PurchasesRoutes } from "./purchases.routes";
import { PurchasesService } from "./purchases.service";
import { UsersRepository } from "../users/users.repository";
import { ItemsRepository } from "../items/items.repository";

const PurchasesModule = new Container();

PurchasesModule.bind<PurchasesRepository>(
  PurchasesToken.PurchasesRepository
).to(PurchasesRepository);
PurchasesModule.bind<PurchasesController>(
  PurchasesToken.PurchasesController
).to(PurchasesController);
PurchasesModule.bind<PurchasesService>(PurchasesToken.PurchasesService).to(
  PurchasesService
);
PurchasesModule.bind<PurchasesRoutes>(PurchasesToken.PurchasesRoutes).to(
  PurchasesRoutes
);

PurchasesModule.bind<UsersRepository>(UsersToken.UsersRepository).to(
  UsersRepository
);
PurchasesModule.bind<ItemsRepository>(ItemsToken.ItemsRepository).to(
  ItemsRepository
);

export { PurchasesModule };
