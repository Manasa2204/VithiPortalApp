import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JWT session strategy
  },

  pages: {
    signIn: "/signin", // Corrected the path from "/sigin" to "/signin"
  },
  secret: process.env.NEXTAUTH_SECRET || "1212312k23kh2h12jkh3jk1", // Keep your secret here
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      // profile(profile: any) {
      //   return {
      //     ...profile,
      //     role: profile.role ?? "user",
      //   };
      // },
    }),
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        try {
          const response = await fetch(
            `https://timetracker.vithiit.com/graphql`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                query: `mutation Signin($email: String, $password: String) {
                  signin(email: $email, password: $password) {
                    msg
                    user {
                      email
                      id
                      role
                      userName
                    }
                  }
                }`,
                variables: {
                  email: credentials.email,
                  password: credentials.password,
                },
              }),
            }
          );

          const parsedData = await response.json();

          // Check for errors
          if (parsedData.errors || !parsedData.data.signin.user) {
            return null; // Returning null if the sign-in fails
          }

          // Returning user object if sign-in is successful
          const user = parsedData.data.signin.user;

          return user; // Return just the user object, not wrapped in `{ user: user }`
        } catch (error) {
          console.error("Error in authorize function", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // If user object is returned, save user details to the token
      console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
      console.log(token, "user");
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.name = user.userName;
      }
      token.role = token.role ?? "EMPLOYEE";
      return token;
    },

    async session({ session, token }) {
      // Attaching user data to the session object
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.email = token.email;
      //   session.user.role = token.role;
      // }
      console.log(token, session, "jhjk");

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          role: token.role,
        },
      };
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
};
