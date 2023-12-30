import NextAuth from "next-auth";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import CredentialsProvider from "./CredentialsProvider";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;

      const [user] = await db
        .select({
          id: usersTable.displayId,
          provider: usersTable.provider,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          provider: user.provider,
        },
      };
    },
  },
  pages: {
    signIn: "/",
  },
});
