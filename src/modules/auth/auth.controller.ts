import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dtos/login.dto";

@injectable()
export class AuthController {
  constructor(
    @inject(UsersToken.UsersService) private readonly usersService: UsersService
  ) {}

  public async login(req: Request, res: Response) {
    const dto = req.body as LoginDto;

    if (!dto) {
      res.status(400).json({ error: "Invalid DTO." });
    }

    try {
      const user = await this.usersService.getUserByUsername(dto.username);

      if (!user) {
        const newUser = await this.usersService.createUser(dto);

        req.session.userId = newUser.id;
        res.status(200).json({ ...newUser, password: undefined });

        return;
      }

      const isPasswordValid = await this.comparePassword(
        dto.password,
        user.password
      );

      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials." });
        return;
      }

      req.session.userId = user.id;
      res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      console.log(error);
    }
  }

  private async comparePassword(raw: string, encoded: string) {
    return await bcrypt.compare(raw, encoded);
  }
}
