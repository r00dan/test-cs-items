import express, { Application } from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";

import { HealthModule } from "./modules/health/health.module";
import { HealthRoutes } from "./modules/health/health.routes";
import {
  AuthToken,
  HealthToken,
  ItemsToken,
  PurchasesToken,
  UsersToken,
} from "./core/inversify-tokens";
import { runMigrations } from "./migrations";
import { UsersModule } from "./modules/users/users.module";
import { UsersRoutes } from "./modules/users/users.routes";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthRoutes } from "./modules/auth/auth.routes";
import {
  getNonTradableItemsAndPopulateDB,
  getTradableItemsAndPopulateDB,
} from "./modules/items/populateItems";
import { ItemsModule } from "./modules/items/items.module";
import { ItemsRoutes } from "./modules/items/items.routes";
import { Cache } from "./core/cache";
import { PurchasesModule } from "./modules/purchases/purchases.module";
import { PurchasesRoutes } from "./modules/purchases/purchases.routes";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  public async start(port: number) {
    try {
      await runMigrations();
      await getTradableItemsAndPopulateDB();
      await getNonTradableItemsAndPopulateDB();

      this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {}
  }

  private middlewares() {
    this.app.use(express.json());

    const { redis } = Cache.getInstance();

    this.app.use(
      session({
        store: new RedisStore({ client: redis }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
      })
    );
  }

  private routes() {
    const healthRoutes = HealthModule.get<HealthRoutes>(
      HealthToken.HealthRoutes
    );
    const usersRoutes = UsersModule.get<UsersRoutes>(UsersToken.UsersRoutes);
    const authRoutes = AuthModule.get<AuthRoutes>(AuthToken.AuthRoutes);
    const itemsRoutes = ItemsModule.get<ItemsRoutes>(ItemsToken.ItemsRoutes);
    const purchasesRoutes = PurchasesModule.get<PurchasesRoutes>(
      PurchasesToken.PurchasesRoutes
    );

    this.app.use("/health", healthRoutes.router);
    this.app.use("/user", usersRoutes.router);
    this.app.use("/auth", authRoutes.router);
    this.app.use("/item", itemsRoutes.router);
    this.app.use("/purchase", purchasesRoutes.router);
  }
}
