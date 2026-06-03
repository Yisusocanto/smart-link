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

	baseURL: process.env["BETTER_AUTH_URL"] || "http://localhost:3001",

	advanced: {
		cookiePrefix: "smart-link",
		useSecureCookies: process.env["NODE_ENV"] === "production",
		defaultCookieAttributes: {
			sameSite: "lax",
			secure: process.env["NODE_ENV"] === "production",
			httpOnly: true,
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
