import { UserRepository } from "@/http/repositories/userRepository";
import { AuthService } from "../auth";

export const makeAuthService = () => {
  const userRepository = new UserRepository();
  const authService = new AuthService(userRepository);

  return authService;
};
