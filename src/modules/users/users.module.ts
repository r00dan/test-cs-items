import { Container } from "inversify";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersRoutes } from "./users.routes";

const UsersModule = new Container();

UsersModule.bind<UsersRepository>(UsersToken.UsersRepository).to(
  UsersRepository
);
UsersModule.bind<UsersService>(UsersToken.UsersService).to(UsersService);
UsersModule.bind<UsersController>(UsersToken.UsersController).to(
  UsersController
);
UsersModule.bind<UsersRoutes>(UsersToken.UsersRoutes).to(UsersRoutes);

export { UsersModule };
