import { User } from "@prisma/client";
import { IUserRepository } from "../repositories/interfaces/userRepository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";

interface IAuthServiceRequest {
  email: string;
  password: string;
}

interface IAuthServiceResponse {
  user: User;
}

export class AuthService {
  constructor(private userRepository: IUserRepository) {}
  async execute({
    email,
    password,
  }: IAuthServiceRequest): Promise<IAuthServiceResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
