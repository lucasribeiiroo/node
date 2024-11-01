import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "@/http/repositories/interfaces/userRepository";

export class InMemoryUserRepository implements IUserRepository {
  public items: User[] = [];
  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    return user || null;
  }
  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
