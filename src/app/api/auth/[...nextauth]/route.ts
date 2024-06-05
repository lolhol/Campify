import NextAuth, { Awaitable, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { promises as fs } from "fs";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";

enum Exception {
  INVALID_EMAIL = "INVALID_EMAIL",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  SERVER_ERROR = "SERVER_ERROR",
}

const handler = NextAuth({
  secret: "JTnGn4XGS7",
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "LittleTimmy123@pinewood.edu",
        },
        password: {
          label: "Password",
          placeholder: "timmyssecurepassword69",
        },
      },
      async authorize(credentials, req) {
        const email = String(credentials?.username);

        if (email.match("@pinewood.edu")) {
          if (email.startsWith("/^d/")) {
            return { id: email, name: email };
          }

          return { id: email, name: email };
        }

        throw new Error(Exception.INVALID_EMAIL);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
});

export { handler as GET, handler as POST };
