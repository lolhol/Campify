import NextAuth, {
  AuthOptions,
  Awaitable,
  DefaultSession,
  Profile,
  User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { promises as fs } from "fs";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import { sql } from "@/internal/core";
import { Account } from "@/internal/user/Account";
import { Session } from "node:inspector";

enum Exception {
  INVALID_EMAIL = "INVALID_EMAIL",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  SERVER_ERROR = "SERVER_ERROR",
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "LittleTimmy123@school.edu",
        },
        password: {
          label: "Password",
          placeholder: "timmyssecurepassword69",
        },
      },
      async authorize(credentials, req) {
        throw new Error(Exception.INVALID_EMAIL);
      },
    }),
    GoogleProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "google") {
        const res = await sql<Account[]>`
          SELECT
            email,
            provider_id
          FROM
            account
          WHERE
            email = ${user.email ?? null}
            OR provider_id = ${user.id}
        `;

        if (res.length > 0) {
          return true;
        }

        await sql`
          INSERT INTO account
          (
            email,
            name,
            provider_id,
            image_url
          )
          VALUES
          (
            ${user.email ?? null},
            ${user.name ?? null},
            ${user.id ?? null},
            ${user.image ?? null}
          )
        `;

        return true;
      }

      return false;
    },

    // TODO: make sure user exists
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const res = await sql<
          { id: string }[]
        >`SELECT id FROM account WHERE email = ${user.email ?? null} and provider_id = ${user.id}`;
        return { id: res[0].id };
      }

      return token;
    },

    async session({ session, token, user }) {
      const res = await sql<
        {
          id: string;
          name: string;
          image_url: string;
          email: string;
        }[]
      >`
        SELECT
          id,
          name,
          image_url,
          email
        FROM
          account
        WHERE
          id = ${token.id}
      `;

      session.user = res[0];
      return session;
    },
  },
};

const h = NextAuth(authOptions);

export const POST = h;
export const GET = h;
