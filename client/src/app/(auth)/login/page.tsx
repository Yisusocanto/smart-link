"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import axios from "axios";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      setError(
        axios.isAxiosError(error)
          ? error.response?.data.error
          : "Unknown error",
      );
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-xl  p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold">Welcome Back</h1>
        <p className="mb-6 text-gray-400">Sign in to your account</p>

        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <TextField isInvalid={!!errors.email}>
              <Label className="mb-1 block text-sm font-medium">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={"bg-[#27272a]"}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
          </div>

          <div>
            <TextField isInvalid={!!errors.password}>
              <Label className="mb-1 block text-sm font-medium">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={"bg-[#27272a]"}
              />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
          </div>

          <Button type="submit" isDisabled={isSubmitting} fullWidth>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </Form>
        {error && <span className="text-danger">{error}</span>}

        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
