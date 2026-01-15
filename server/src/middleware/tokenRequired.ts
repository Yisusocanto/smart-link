import { Response, Request, NextFunction } from "express";
import { verifyToken } from "../lib/tokenHandler.js";

export const tokenRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.smartLink;
  if (!token) {
    res.status(401).json({ error: "token not provided." });
    return;
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.clearCookie("smartLink");
    res.status(401).json({ error: "Token invalid." });
    return;
  }

  req.user = {
    _id: payload.sub,
  };
  next();
};
