import type { NextFunction, Request, Response } from "express";

// Clase personalizada para errores HTTP
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
}

// Helpers para crear errores comunes
export const BadRequest = (message: string) => new HttpError(message, 400);
export const Unauthorized = (message: string) => new HttpError(message, 401);
export const Forbidden = (message: string) => new HttpError(message, 403);
export const NotFound = (message: string) => new HttpError(message, 404);
export const Conflict = (message: string) => new HttpError(message, 409);

// Middleware central de errores
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err.message);

  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Error genérico para errores no manejados
  res.status(500).json({ error: "Internal server error." });
};
