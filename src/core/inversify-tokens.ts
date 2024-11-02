export const HealthToken = {
  HealthService: Symbol.for("HealthService"),
  HealthController: Symbol.for("HealthController"),
  HealthRoutes: Symbol.for("HealthRoutes"),
};

export const UsersToken = {
  UsersRepository: Symbol.for("UsersRepository"),
  UsersService: Symbol.for("UsersService"),
  UsersController: Symbol.for("UsersController"),
  UsersRoutes: Symbol.for("UsersRoutes"),
};

export const PurchasesToken = {
  PurchasesRepository: Symbol.for("PurchasesRepository"),
};

export const ItemsToken = {
  ItemsRepository: Symbol.for("ItemsRepository"),
  ItemsService: Symbol.for("ItemsService"),
  ItemsController: Symbol.for("ItemsController"),
  ItemsRoutes: Symbol.for("ItemsRoutes"),
};

export const AuthToken = {
  AuthController: Symbol.for("AuthController"),
  AuthRoutes: Symbol.for("AuthRoutes"),
};
