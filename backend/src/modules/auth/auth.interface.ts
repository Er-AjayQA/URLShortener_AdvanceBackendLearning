import { User } from "../../generated/prisma/index.js";
import { RegisterUserType } from "./auth.types.js";

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User | null>;

  createUser(data: RegisterUserType): Promise<User>;
}
