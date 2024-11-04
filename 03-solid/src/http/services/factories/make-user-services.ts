import { UserRepository } from "@/http/repositories/userRepository";
import { RegisterUser } from "../registerUser";
import { UserProfileService } from "../userProfile";

export const makeRegisterService = () => {
  const userRepository = new UserRepository();
  const useCase = new RegisterUser(userRepository);

  return useCase;
};

export const makeUserProfileService = () => {
  const userRepository = new UserRepository();
  const useCase = new UserProfileService(userRepository);

  return useCase;
};
