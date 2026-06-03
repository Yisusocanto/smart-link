import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

const MongoClient = mongoose.mongo.MongoClient;
const DB_URL = process.env["DB_URL"];

if (!DB_URL) {
	throw new Error("DB_URL is not defined in environment variables");
}

const client = new MongoClient(DB_URL);
const db = client.db();

export const auth = betterAuth({
	database: mongodbAdapter(db),

	secret: process.env["BETTER_AUTH_SECRET"],

	// CRÍTICO: baseURL ahora debe ser la URL del FRONTEND
	// Porque el navegador ahora interactúa con el frontend para la auth (vía proxy)
	baseURL: (process.env["FRONTEND_URL"] || "http://localhost:3000") + "/api/auth",

	advanced: {
		cookiePrefix: "smart-link",
		useSecureCookies: process.env["NODE_ENV"] === "production",
		defaultCookieAttributes: {
			// AHORA: Como usamos proxy, ya NO es cross-domain. Podemos usar 'lax'.
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production",
			httpOnly: true,
			path: "/",
		},
	},

	user: { additionalFields: { username: { type: "string" } } },

	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
			mapProfileToUser: async (profile) => {
				return {
					username:
						profile.name.toLowerCase().replace(/\s+/g, "-") +
						"-" +
						Math.random().toString(36).slice(2, 7),
					name: profile.name,
				};
			},
		},
	},

	emailAndPassword: { enabled: true },

	trustedOrigins: [
		"http://localhost:3000",
		process.env.FRONTEND_URL || "",
	].filter(Boolean),
});
