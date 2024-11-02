import { injectable } from "inversify";

import { sql } from "../../core/database";
import { UsersModel } from "./users.model";
import { CreateUserDto } from "./dtos/create-user.dto";

@injectable()
export class UsersRepository {
  constructor() {}

  public async getUserById(id: string) {
    const users = await sql<
      UsersModel[]
    >`select * from users where id=${id} limit 1`;
    return users[0] || null;
  }

  public async getUserByUsername(username: string) {
    const users = await sql<
      UsersModel[]
    >`select * from users where username=${username} limit 1`;

    return users[0] || null;
  }

  public async getUserList() {
    const users = await sql<UsersModel[]>`select * from users`;
    return users;
  }

  public async createUser({
    username,
    password,
  }: CreateUserDto): Promise<UsersModel> {
    const [user] = await sql<UsersModel[]>`
      insert into users (username, password) 
      values (${username}, ${password}) 
      returning *
    `;
    return user;
  }

  public async updateUserPassword(id: string, password: string): Promise<void> {
    await sql<UsersModel[]>`
      update users set password = ${password}
      where id = ${id}
    `;
  }
}
