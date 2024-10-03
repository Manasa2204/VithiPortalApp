"use client";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserHome() {
  const { data: session } = useSession();
  console.log(session, "session");
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        onClick={() => {
          signOut({
            redirect: true,
            callbackUrl: "/signin",
          });
        }}
        className="bg-green-400 px-7 py-3 text-white rounded-lg cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
}
