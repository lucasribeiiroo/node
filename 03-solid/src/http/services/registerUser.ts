import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { ICreateUser } from "./interfaces";
import { IUserRepository } from "@/http/repositories/interfaces/userRepository";
import { EmailAlreadyExistsError } from "./errors/email-exists";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async create({ name, email, password }: ICreateUser) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    console.log("sameeee", !!userWithSameEmail);
    if (!!userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    await this.userRepository.create({ name, email, password_hash });
  }
}
