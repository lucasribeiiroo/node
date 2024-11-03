import { IUserRepository } from "../repositories/interfaces";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";
import { IAuthServiceRequest, IAuthServiceResponse } from "./interfaces";

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

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
