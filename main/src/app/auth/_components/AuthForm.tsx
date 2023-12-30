"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

// Run: npx shadcn-ui@latest add button
import { Button } from "@/components/ui/button";
// Run: npx shadcn-ui@latest add card
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { publicEnv } from "@/lib/env/public";

import AuthInput from "./AuthInput";

function AuthForm() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 3. sign in by calling signIn() with the correct parameters
    // hint: notion clone
    signIn("credentials", {
      email, 
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/projects`,
    });
    // TODO: 3. end
  };
  return (
    <Card className="min-w-[300px]">
      <CardHeader>
        <CardTitle>Enter your name first</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Name"
            type="name"
            value={email}
            setValue={setEmail}
          />

          <Button
            data-testid="auth-submit-button"
            type="submit"
            className="w-full"
          >
            Let's go
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AuthForm;
