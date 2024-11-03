import { UserRepository } from "@/http/repositories/userRepository";
import { RegisterUser } from "../registerUser";

export const makeRegisterService = () => {
  const userRepository = new UserRepository();
  const registerService = new RegisterUser(userRepository);

  return registerService;
};
