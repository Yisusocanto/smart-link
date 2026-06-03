import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth.js";

/**
 * Middleware para requerir una sesión activa.
 */
export const tokenRequired = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Obtenemos la sesión. 
    // better-auth necesita los headers para encontrar la cookie.
    const session = await auth.api.getSession({
      headers: new Headers(req.headers as any),
    });

    if (!session) {
      console.log(`[Auth] No session found for ${req.path}`);
      // No imprimimos la cookie completa por seguridad, solo si existe
      console.log(`[Auth] Cookies present: ${!!req.headers.cookie}`);
      res.status(401).json({ error: "Unauthorized: No active session found." });
      return;
    }

    // Inyectamos el usuario en la request
    // Nota: El id de better-auth es un string. 
    req.user = {
      _id: session.user.id,
      email: session.user.email,
    };
    
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
