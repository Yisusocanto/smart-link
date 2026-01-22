import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

export const tokenOptional = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as any),
  });

  if (session) {
    req.user = {
      _id: session.user.id,
    };
  }

  next();
};
