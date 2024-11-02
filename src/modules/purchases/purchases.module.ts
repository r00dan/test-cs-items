import { Container } from "inversify";

import { PurchasesToken } from "../../core/inversify-tokens";
import { PurchasesRepository } from "./purchases.repository";

const PurchasesModule = new Container();

PurchasesModule.bind<PurchasesRepository>(
  PurchasesToken.PurchasesRepository
).to(PurchasesRepository);

export { PurchasesModule };
