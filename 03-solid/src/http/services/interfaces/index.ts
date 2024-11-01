import { User } from "@prisma/client";

export interface ICreateUser {
  name: string;
  password: string;
  email: string;
}

export interface IRegisterUser {
  user: User;
}
