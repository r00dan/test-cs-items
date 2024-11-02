import { Container } from "inversify";

import { ItemsToken } from "../../core/inversify-tokens";
import { ItemsRepository } from "./items.repository";

const ItemsModule = new Container();

ItemsModule.bind<ItemsRepository>(ItemsToken.ItemsRepository).to(
  ItemsRepository
);

export { ItemsModule };
