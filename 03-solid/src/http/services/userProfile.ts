import { IUserRepository } from "../repositories/interfaces";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { IUserProfileRequest, IUserProfileResponse } from "./interfaces";

export class UserProfileService {
  constructor(private userRepository: IUserRepository) {}
  async execute({ id }: IUserProfileRequest): Promise<IUserProfileResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
