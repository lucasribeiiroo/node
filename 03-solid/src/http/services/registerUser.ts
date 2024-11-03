import { hash } from "bcryptjs";
import { ICreateUser, IRegisterUser } from "./interfaces";
import { IUserRepository } from "@/http/repositories/interfaces";
import { EmailAlreadyExistsError } from "./errors/email-exists";

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async create({ name, email, password }: ICreateUser): Promise<IRegisterUser> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (!!userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
