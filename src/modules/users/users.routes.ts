import { Router } from "express";
import { inject, injectable } from "inversify";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersController } from "./users.controller";

@injectable()
export class UsersRoutes {
  public router: Router;

  constructor(
    @inject(UsersToken.UsersController)
    private usersController: UsersController
  ) {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/", (req, res) =>
      this.usersController.createUser(req, res)
    );
    this.router.get("/", (req, res) =>
      this.usersController.getUserList(req, res)
    );
  }
}
