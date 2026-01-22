import { authClient } from "./auth-client";

export const signInGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "http://localhost:3000/dashboard",
  });
};
