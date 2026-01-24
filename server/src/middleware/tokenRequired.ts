import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth.js";

export const tokenRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("--- New Request ---");
  console.log("Path:", req.path);
  console.log("Headers:", JSON.stringify(req.headers, null, 2));

  const session = await auth.api.getSession({
    headers: new Headers(req.headers as any),
  });

  console.log("Session found:", !!session);

  if (!session) {
    res.status(401).json({ error: "Session not found or invalid." });
    return;
  }

  req.user = {
    _id: session.user.id,
  };
  next();
};
