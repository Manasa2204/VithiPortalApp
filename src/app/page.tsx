import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await getServerSession(authOptions);
  console.log("hello, session", session);
  if (session) {
    redirect("/home");
  } else {
    redirect("/signin");
  }
  return <div>kljkjkljkl</div>;
};

export default Home;
