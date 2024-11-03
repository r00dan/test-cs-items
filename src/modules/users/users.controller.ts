import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdatePasswordDto } from "./dtos/update-password.dto";

@injectable()
export class UsersController {
  constructor(
    @inject(UsersToken.UsersService) private readonly usersService: UsersService
  ) {}

  public async getUser(req: Request, res: Response) {
    const userId = req.session.userId;

    try {
      const user = await this.usersService.getUserById(userId);

      res.status(201).json({ ...user, password: undefined });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal error." });
    }
  }

  public async createUser(req: Request, res: Response) {
    const dto = req.body as CreateUserDto;

    if (!dto) {
      res.status(400).json({ error: "Validation error." });
    }

    try {
      const user = await this.usersService.createUser(dto);

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(409).json({ error: "Unable to create user." });
    }
  }

  public async updatePassword(req: Request, res: Response) {
    const userId = req.session.userId;
    const dto = req.body as UpdatePasswordDto;

    try {
      await this.usersService.updatePassword(userId, dto);

      res.status(201).json({ status: "success" });
    } catch (error) {
      res.status(500).json({ error: "Internal error." });
    }
  }
}
