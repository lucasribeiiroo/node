import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { IUserRepository } from "./interfaces/userRepository";

export class UserRepository implements IUserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }
}
