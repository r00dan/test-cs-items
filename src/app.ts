import express, { Application } from "express";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";

import { HealthModule } from "./modules/health/health.module";
import { HealthRoutes } from "./modules/health/health.routes";
import { AuthToken, HealthToken, UsersToken } from "./core/inversify-tokens";
import { runMigrations } from "./migrations";
import { UsersModule } from "./modules/users/users.module";
import { UsersRoutes } from "./modules/users/users.routes";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthRoutes } from "./modules/auth/auth.routes";

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export class App {
  public app: Application;
  private redis: Redis | null = null;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  public async start(port: number) {
    try {
      await runMigrations();
      this.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {}
  }

  private async connectRedis() {
    if (!this.redis) {
      try {
        this.redis = new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        });
        // await this.redis.connect();
      } catch (error) {
        console.error(error);
      }
    }
  }

  private middlewares() {
    this.app.use(express.json());
    this.connectRedis();
    this.app.use(
      session({
        store: new RedisStore({ client: this.redis }),
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

    this.app.use("/health", healthRoutes.router);
    this.app.use("/user", usersRoutes.router);
    this.app.use("/auth", authRoutes.router);
  }
}
