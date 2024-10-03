"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface props {
  children: ReactNode;
}

export default function Sessionprovider({ children }: props) {
  return <SessionProvider>{children}</SessionProvider>;
}
