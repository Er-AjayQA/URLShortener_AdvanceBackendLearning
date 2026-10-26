export type RegisterUserType = {
  name: string;
  email: string;
  passwordHash: string;
};

export type JwtPayloadType = {
  userId: string;
};
