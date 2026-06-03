import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	// AHORA: Usamos la URL del propio frontend (relativa) 
	// para que las cookies se guarden en el dominio de Vercel.
	baseURL: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_FRONTEND_URL,
	plugins: [inferAdditionalFields({ user: { username: { type: "string" } } })],
	fetchOptions: { credentials: "include" },
});
