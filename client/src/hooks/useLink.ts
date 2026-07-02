"use client";

import {
	createLink,
	deleteLink,
	toggleLinkStatus,
} from "@/services/linkService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";

export const useCreateLink = () => {
	return useMutation({
		mutationFn: (originalURL: string) => createLink(originalURL),
	});
};

export const useToggleLinkStatus = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: toggleLinkStatus,
		onSuccess: () => {
			router.refresh();
		},
		onError: (error: any) => {
			const errorMsj = error.message || "Unknown error.";
			toast.danger(errorMsj);
		},
	});
};

export const useDeleteLink = () => {
	const router = useRouter();
	return useMutation({
		mutationFn: deleteLink,
		onSuccess: () => {
			router.refresh();
		},
		onError: (error: any) => {
			const errorMsj = error.message || "Unknown error.";
			toast.danger(errorMsj);
		},
	});
};
