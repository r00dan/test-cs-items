import { Router } from "express";
import { inject, injectable } from "inversify";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersController } from "./users.controller";
import { isAuthenticated } from "../../core/middlewares/is-authenticated.middleware";

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
    /**
     * @swagger
     * /:
     *   get:
     *     summary: Retrieve a user
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Successfully retrieved user.
     *       401:
     *         description: Unauthorized.
     */
    this.router.get("/", isAuthenticated, (req, res) =>
      this.usersController.getUser(req, res)
    );
    this.router.post("/", (req, res) =>
      this.usersController.createUser(req, res)
    );
    this.router.put("/password", isAuthenticated, (req, res) =>
      this.usersController.updatePassword(req, res)
    );
  }
}
