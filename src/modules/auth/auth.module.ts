import { Container } from "inversify";

import { AuthToken, UsersToken } from "../../core/inversify-tokens";
import { AuthController } from "./auth.controller";
import { AuthRoutes } from "./auth.routes";
import { UsersService } from "../users/users.service";
import { UsersRepository } from "../users/users.repository";

const AuthModule = new Container();

AuthModule.bind<AuthController>(AuthToken.AuthController).to(AuthController);
AuthModule.bind<AuthRoutes>(AuthToken.AuthRoutes).to(AuthRoutes);
AuthModule.bind<UsersRepository>(UsersToken.UsersRepository).to(
  UsersRepository
);
AuthModule.bind<UsersService>(UsersToken.UsersService).to(UsersService);

export { AuthModule };
