import { AppError } from "../../common/helpers/AppError.js";
import {
  hashPassword,
  signAccessToken,
  signRefreshToken,
} from "./auth.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { sanitizedUserResponse } from "./auth.response.js";
import { RegisterUserInputType } from "./auth.schema.js";

export class AuthService {
  constructor(private authRepo: IAuthRepository) {}

  async registerUser(data: RegisterUserInputType) {
    const { name, email, password } = data;

    const existingUser = await this.authRepo.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User already registered", 409);
    }

    const passwordHash = (await hashPassword(password)) as string;

    const user = await this.authRepo.createUser({ name, email, passwordHash });

    const accessToken = signAccessToken({ userId: user?.id });
    const refreshToken = signRefreshToken({ userId: user?.id });

    return { user: sanitizedUserResponse(user), accessToken, refreshToken };
  }
}
