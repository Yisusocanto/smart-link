const BASE_STRING =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const createAlias = (length: number = 8): string => {
  let alias = "";
  for (let i = 0; i < length; i++) {
    const letter = BASE_STRING[Math.floor(Math.random() * BASE_STRING.length)];
    alias += letter;
  }
  return alias;
};
