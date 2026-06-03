import { Response, Request, NextFunction } from "express";
import { auth } from "../lib/auth.js";

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
			res.status(401).json({ error: "Unauthorized: No active session found." });
			return;
		}

		req.user = { _id: session.user.id, email: session.user.email };

		next();
	} catch (error) {
		console.error("Auth Middleware Error:", error);
		res
			.status(500)
			.json({ error: "Internal Server Error during authentication." });
	}
};
