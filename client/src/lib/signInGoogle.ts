import { authClient } from "./auth-client";

export const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`,
  });
};
