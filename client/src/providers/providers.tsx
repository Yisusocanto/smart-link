import TanstackProvider from "./TanstackProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProvider>
      {children}
    </TanstackProvider>
  );
}
