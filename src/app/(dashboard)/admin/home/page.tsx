"use client";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  console.log();
  return <div onClick={() => router.push("/profile")}>Admin dashboard</div>;
}
