import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";

const MongoClient = mongoose.mongo.MongoClient;

const DB_URL = process.env["DB_URL"] ?? "";

const client = new MongoClient(DB_URL);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  secret:
    process.env["BETTER_AUTH_SECRET"] ?? "default-secret-change-in-production",
  baseURL: process.env["BETTER_AUTH_URL"] ?? "http://localhost:3001/api/auth",
  experimental: { joins: true },
  advanced: {
    cookiePrefix: "smart-link",
    defaultCookieAttributes: {
      sameSite: "none",
    },
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.CLIENT_ID ?? "",
      clientSecret: process.env.CLIENT_SECRET ?? "",
      scope: ["email", "profile"],
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

  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.FRONTEND_URL ?? "",
  ],
});
