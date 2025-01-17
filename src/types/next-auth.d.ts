import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    userName: string;
    role: string;
    id: string;
    email: string;
  }
  interface Session {
    user: User;
  }
}
