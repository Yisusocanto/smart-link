"use client";

import TanstackProvider from "./TanstackProvider";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      <AuthProvider>{children}</AuthProvider>
    </TanstackProvider>
  );
}
