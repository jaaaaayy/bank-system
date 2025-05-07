"use client";

import { login } from "@/actions/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useUserContext } from "@/hooks/use-user-context";

const LoginForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, undefined);
  const { setFullName, setLastLogin, setLastFailedLogin } = useUserContext();

  useEffect(() => {
    if (state?.success === true) {
      setFullName(state.fullName);
      setLastLogin(state.lastLogin);
      setLastFailedLogin(state.lastFailedLogin);

      router.replace("/accounts");

      toast.success("Success", {
        description: state.message,
        style: {
          color: "white",
          backgroundColor: "green",
        },
      });
    } else if (state?.success === false) {
      toast.error("Error", {
        description: state.message,
        style: {
          color: "white",
          backgroundColor: "red",
        },
      });
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Login to your account.
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="username"
              className={`${state?.errors?.username && "text-destructive"}`}
            >
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
              tabIndex={1}
              autoFocus
              className={`${
                state?.errors?.username &&
                "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
              }`}
            />
            {state?.errors?.username && (
              <p className="text-destructive">{state.errors.username}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label
                htmlFor="password"
                className={`${state?.errors?.password && "text-destructive"}`}
              >
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="underline underline-offset-4"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              tabIndex={2}
              className={`${
                state?.errors?.password &&
                "focus-visible:border-destructive/50 focus-visible:ring-destructive/50 border-destructive/50"
              }`}
            />
            {state?.errors?.password && (
              <div className="text-destructive">
                <p>Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Button disabled={pending} type="submit" tabIndex={3}>
            {pending ? "Logging in..." : "Login"}
          </Button>
          <p className="text-center">
            Don't have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
