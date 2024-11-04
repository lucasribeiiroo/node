import { UserRepository } from "@/http/repositories/userRepository";
import { RegisterUser } from "../registerUser";
import { UserProfileService } from "../userProfile";

export const makeRegisterService = () => {
  const userRepository = new UserRepository();
  const registerService = new RegisterUser(userRepository);

  return registerService;
};

export const makeUserProfileService = () => {
  const userRepository = new UserRepository();
  const registerService = new UserProfileService(userRepository);

  return registerService;
};
