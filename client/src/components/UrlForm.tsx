"use client";

import { useCreateLink } from "@/hooks/useLink";
import {
	Button,
	Card,
	FieldError,
	Form,
	InputGroup,
	Separator,
	Spinner,
	TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Link2, SquareArrowOutUpRight, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { handleCopy } from "@/lib/handleCopy";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@heroui/react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

const Schema = z.object({ url: z.url("URL invalid.") });

function UrlForm() {
	const x = buttonVariants({ variant: "outline", isIconOnly: true });
	const { data: session } = authClient.useSession();
	const isAuthenticated = !!session;

	const [copied, setCopied] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: zodResolver(Schema) });

	const {
		mutate: createLink,
		isPending,
		isError,
		error,
		data,
	} = useCreateLink();

	const onSubmit = handleSubmit((data) => {
		createLink(data.url);
	});

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<TextField isInvalid={!!errors.url} aria-label="text-field">
					<InputGroup
						className={"py-2 w-full max-w-2xl mx-auto shadow-lg/50 shadow-accent/20"}>
						<InputGroup.Input
							className={"text-xl w-full min-w-0"}
							type="text"
							{...register("url")}
							placeholder="https://example.com/very-long-url-to-shorten..."
						/>
						<InputGroup.Suffix>
							<Button aria-label="submit" type="submit">
								{isPending ? <Spinner color="current" /> : <Zap />}
								{isPending ? "Shorting..." : "Shorten"}
							</Button>
						</InputGroup.Suffix>
					</InputGroup>
					<FieldError>{errors.url?.message}</FieldError>
				</TextField>
			</Form>
			{isError && (
				<p className="text-danger">
					{(error as any)?.message || "Unknown error."}
				</p>
			)}
			{data && (
				<>
					<Card className="flex flex-col sm:flex-row w-full max-w-2xl mt-5 border p-4 gap-3 mx-auto items-start sm:items-center">
						<span className="flex-1 flex font-semibold text-accent items-center gap-2 w-full break-all">
							<Link2 size={20} className="shrink-0" /> {data.shortenLink}
						</span>
						<div className="hidden sm:block h-6 border-l border-border" />
						<span className="w-full sm:flex-3 text-muted truncate">
							{data.originalURL}
						</span>
						<div className="flex gap-2 w-full sm:w-auto justify-end">
							<CopyButton shortenLink={data.shortenLink} />
							<Link href={data.shortenLink} className={x} target="_blank">
								<SquareArrowOutUpRight />
							</Link>
						</div>
					</Card>
				</>
			)}
		</div>
	);
}

export default UrlForm;
