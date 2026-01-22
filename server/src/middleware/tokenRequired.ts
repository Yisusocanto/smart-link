import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth.js";

export const tokenRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: new Headers(req.headers as any),
  });

  if (!session) {
    res.status(401).json({ error: "Session not found or invalid." });
    return;
  }

  req.user = {
    _id: session.user.id,
  };
  next();
};
