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
     * /user:
     *   get:
     *     summary: Retrieve a user
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Shows asuthorized user.
     *       401:
     *         description: Unauthorized.
     */
    this.router.get("/", isAuthenticated, (req, res) =>
      this.usersController.getUser(req, res)
    );
    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Create a user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: Username of the user
     *               password:
     *                 type: string
     *                 description: Password of the user
     *             required:
     *               - username
     *               - password
     *     responses:
     *       201:
     *        description: Successful create user.
     */
    this.router.post("/", (req, res) =>
      this.usersController.createUser(req, res)
    );
    /**
     * @swagger
     * /user/password:
     *   put:
     *     summary: Update user's password
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               password:
     *                 type: string
     *                 description: Password of the user
     *             required:
     *               - password
     *     responses:
     *       201:
     *        description: Successful update user's password.
     */
    this.router.put("/password", isAuthenticated, (req, res) =>
      this.usersController.updatePassword(req, res)
    );
  }
}
