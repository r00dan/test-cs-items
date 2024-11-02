import { Router } from "express";
import { inject, injectable } from "inversify";

import { AuthToken } from "../../core/inversify-tokens";
import { AuthController } from "./auth.controller";

@injectable()
export class AuthRoutes {
  public router: Router;

  constructor(
    @inject(AuthToken.AuthController)
    private authController: AuthController
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/login", (req, res) =>
      this.authController.login(req, res)
    );
  }
}
