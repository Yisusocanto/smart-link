import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const JWT_SECRET = process.env["JWT_SECRET"] || "secret";

interface Payload {
  sub: string;
}

export const createToken = (userID: string) => {
  const payload: Payload = {
    sub: userID,
  };

  const token = sign(payload, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const payload = verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as Payload;
    return payload;
  } catch (error) {
    console.log("Error verifiying the token.");
    return false;
  }
};
