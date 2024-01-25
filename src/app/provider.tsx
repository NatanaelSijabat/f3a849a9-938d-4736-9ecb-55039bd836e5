"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProviders({ children }: React.PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
