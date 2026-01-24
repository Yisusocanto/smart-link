import { authClient } from "./auth-client";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "";

export const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${FRONTEND_URL}/dashboard`,
  });
};
