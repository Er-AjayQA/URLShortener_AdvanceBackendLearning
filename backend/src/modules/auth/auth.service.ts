import { AppError } from "../../common/helpers/AppError.js";
import {
  comparePassword,
  hashPassword,
  signAccessToken,
  signRefreshToken,
} from "./auth.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { sanitizedUserResponse } from "./auth.response.js";
import { LoginUserInputType, RegisterUserInputType } from "./auth.schema.js";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  async createTokens(
    userId: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = signAccessToken({ userId });
    const refreshToken = signRefreshToken({ userId });

    return { accessToken, refreshToken };
  }

  async registerUser(data: RegisterUserInputType) {
    const { name, email, password } = data;

    const existingUser = await this.authRepo.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User already registered", 409);
    }

    const passwordHash = (await hashPassword(password)) as string;

    const user = await this.authRepo.createUser({ name, email, passwordHash });

    const { accessToken, refreshToken } = await this.createTokens(user?.id);

    return { user: sanitizedUserResponse(user), accessToken, refreshToken };
  }

  async loginUser(data: LoginUserInputType) {
    const { email, password } = data;
    const user = await this.authRepo.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const verifyPassword = await comparePassword(
      password,
      user?.passwordHash as string,
    );

    if (!verifyPassword) {
      throw new AppError("Invalid credentials", 401);
    }

    const { accessToken, refreshToken } = await this.createTokens(user?.id);

    return { user: sanitizedUserResponse(user), accessToken, refreshToken };
  }

  async getLoggedInUserDetails(userId: string) {
    const user = await this.authRepo.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return { user: sanitizedUserResponse(user) };
  }
}
