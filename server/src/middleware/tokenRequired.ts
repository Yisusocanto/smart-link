import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth.js";

/**
 * Middleware para requerir una sesión activa.
 * Usa el API de better-auth para validar los headers de la petición.
 */
export const tokenRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as any),
    });

    if (!session) {
      console.log(`[Auth] No session found for path: ${req.path}`);
      res.status(401).json({ error: "Unauthorized: No active session found." });
      return;
    }

    console.log(`[Auth] Session found for user: ${session.user.email}`);

    // Inyectamos el usuario en la request para uso de los controladores
    req.user = {
      _id: session.user.id,
      email: session.user.email,
    };
    
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ error: "Internal Server Error during authentication." });
  }
};
