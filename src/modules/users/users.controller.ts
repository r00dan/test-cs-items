import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@injectable()
export class UsersController {
  constructor(
    @inject(UsersToken.UsersService) private readonly usersService: UsersService
  ) {}

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

  public async getUserList(req: Request, res: Response) {
    try {
      const users = await this.usersService.getUserList();

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal error." });
    }
  }
}
