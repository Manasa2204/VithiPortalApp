import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname, "pathname");
    console.log(request.nextauth.token);

    // if (request.nextUrl.pathname.startsWith("/extra")
    //     && request.nextauth.token?.role !== "admin") {
    //     return NextResponse.rewrite(
    //         new URL("/denied", request.url)
    //     )
    // }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/user") &&
      request.nextauth.token?.role !== "EMPLOYEE"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*", "/profile"],
};
