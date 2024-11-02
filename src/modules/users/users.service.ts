import { inject, injectable } from "inversify";
import bcrypt from "bcryptjs";

import { UsersToken } from "../../core/inversify-tokens";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "./dtos/create-user.dto";

@injectable()
export class UsersService {
  constructor(
    @inject(UsersToken.UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  public async getUserById(id: string) {
    return await this.usersRepository.getUserById(id);
  }

  public async getUserByUsername(username: string) {
    return await this.usersRepository.getUserByUsername(username);
  }

  public async getUserList() {
    return await this.usersRepository.getUserList();
  }

  public async createUser(dto: CreateUserDto) {
    const hash = await this.encodePassword(dto.password);

    return await this.usersRepository.createUser({ ...dto, password: hash });
  }

  private async encodePassword(raw: string) {
    return await bcrypt.hash(raw, 2);
  }
}
