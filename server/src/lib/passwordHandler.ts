import { hash, compare, genSalt } from "bcrypt";

export const hashPassword = async (planePassword: string) => {
  const salt = await genSalt(10);
  const hashedPassword = await hash(planePassword, salt);
  return hashedPassword;
};

export const comparePassword = async (
  planePassword: string,
  hashedPassword: string
) => {
  const result = await compare(planePassword, hashedPassword);
  return result;
};
