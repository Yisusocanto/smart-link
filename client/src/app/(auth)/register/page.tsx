"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signInGoogle } from "@/lib/signInGoogle";
import Image from "next/image";

const registerSchema = z
	.object({
		username: z.string().min(3, "Username must be at least 3 characters"),
		email: z.email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
	const [error, setError] = useState("");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		const { error } = await authClient.signUp.email({
			email: data.email,
			password: data.password,
			name: data.username,
			username: data.username,
			callbackURL: "/dashboard",
			fetchOptions: {
				onSuccess: () => router.push("/dashboard"),
			},
		});

		if (error) {
			setError(error.message ?? "Unknown error.");
		}
	};

	return (
		<div className="flex h-screen w-full justify-center">
			<Card className="w-full h-fit max-w-md rounded-xl p-8 shadow-lg">
				<h1 className="mb-2 text-2xl font-bold">Create Account</h1>
				<p className="mb-6 text-muted">Sign up to get started</p>

				<Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<TextField isInvalid={!!errors.username}>
							<Label className="mb-1 block text-sm font-medium">Username</Label>
							<Input
								variant="secondary"
								type="text"
								placeholder="Choose a username"
								{...register("username")}
							/>
							<FieldError>{errors.username?.message}</FieldError>
						</TextField>
					</div>

					<div>
						<TextField isInvalid={!!errors.email}>
							<Label className="mb-1 block text-sm font-medium">Email</Label>
							<Input
								variant="secondary"
								type="email"
								placeholder="Enter your email"
								{...register("email")}
							/>
							<FieldError>{errors.email?.message}</FieldError>
						</TextField>
					</div>

					<div>
						<TextField isInvalid={!!errors.password}>
							<Label className="mb-1 block text-sm font-medium">Password</Label>
							<Input
								variant="secondary"
								type="password"
								placeholder="Create a password"
								{...register("password")}
							/>
							<FieldError>{errors.password?.message}</FieldError>
						</TextField>
					</div>

					<div>
						<TextField isInvalid={!!errors.confirmPassword}>
							<Label className="mb-1 block text-sm font-medium">
								Confirm Password
							</Label>
							<Input
								variant="secondary"
								type="password"
								placeholder="Confirm your password"
								{...register("confirmPassword")}
							/>
							<FieldError>{errors.confirmPassword?.message}</FieldError>
						</TextField>
					</div>

					<Button type="submit" isDisabled={isSubmitting} fullWidth>
						Sign Up
					</Button>
					<Button onPress={() => signInGoogle()} fullWidth variant="tertiary">
						<Image
							src={"/google-icon.svg"}
							alt="google icon"
							height={20}
							width={20}
						/>
						Sign in with Google
					</Button>
				</Form>
				{error && <span className="text-danger">{error}</span>}

				<div className="mt-4 text-center text-sm text-muted">
					Already have an account?{" "}
					<Link href="/login" className="text-blue-500 hover:underline">
						Sign in
					</Link>
				</div>
			</Card>
		</div>
	);
}
