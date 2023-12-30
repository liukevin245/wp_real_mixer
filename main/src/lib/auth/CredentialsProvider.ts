import CredentialsProvider from "next-auth/providers/credentials";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

const authSchema = z.object({
  email: z.string().min(1),
});

export default CredentialsProvider({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "text" },
  },
  async authorize(credentials) {
    let validatedCredentials: {
      email: string;
    };

    try {
      validatedCredentials = authSchema.parse(credentials);
    } catch (error) {
      return null;
    }
    const { email } = validatedCredentials;

    const [existedUser] = await db
      .select({
        id: usersTable.displayId,
        email: usersTable.email,
        provider: usersTable.provider,
      })
      .from(usersTable)
      .where(eq(usersTable.email, validatedCredentials.email.toLowerCase()))
      .execute();
    if (!existedUser) {
      // Sign up

      const [createdUser] = await db
        .insert(usersTable)
        .values({
          email: email.toLowerCase(),
          provider: "credentials",
        })
        .returning();
      return {
        email: createdUser.email,
        id: createdUser.displayId,
        provider: createdUser.provider,
      };
    }

    // Sign in
    if (existedUser.provider !== "credentials") {
      console.log(`The email has registered with ${existedUser.provider}.`);
      return null;
    }

    return {
      email: existedUser.email,
      id: existedUser.id,
      provider: existedUser.provider,
    };
  },
});
