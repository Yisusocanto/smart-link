import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/tokenHandler.js";

export const tokenOptional = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.smartLink;

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      req.user = {
        _id: payload.sub,
      };
      next();
      return;
    }
  }

  next();
};
