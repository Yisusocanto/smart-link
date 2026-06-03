import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";

/**
 * Middleware opcional para identificar al usuario si existe sesión.
 */
export const tokenOptional = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const session = await auth.api.getSession({
			headers: new Headers(req.headers as any),
		});

		if (session) {
			req.user = { 
				_id: session.user.id, 
				email: session.user.email 
			};
		}
	} catch (error) {
		// En el opcional simplemente ignoramos el error y seguimos
		console.error("Auth Optional Middleware Error:", error);
	}

	next();
};
