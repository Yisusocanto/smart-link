import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
	plugins: [inferAdditionalFields({ user: { username: { type: "string" } } })],
	fetchOptions: { credentials: "include" },
});
