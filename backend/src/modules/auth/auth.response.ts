import { User } from "../../generated/prisma/index.js";

export const sanitizedUserResponse = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
