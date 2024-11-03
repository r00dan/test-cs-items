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
    /**
     * @swagger
     * /users/login:
     *   post:
     *     summary: User login
     *     tags: [Auth]
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
     *       200:
     *         description: Successful login
     *       401:
     *         description: Unauthorized
     */
    this.router.post("/login", (req, res) =>
      this.authController.login(req, res)
    );
  }
}
