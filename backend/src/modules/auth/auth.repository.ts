import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";
import { RegisterUserType } from "./auth.types.js";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findUserById(userId: string) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  async createUser(data: RegisterUserType) {
    return await prisma.user.create({ data });
  }
}
