import {
  createLink,
  deleteLink,
  toggleLinkStatus,
} from "@/services/linkService";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    onError: (error) => {
      const errorMsj = axios.isAxiosError(error)
        ? error.response?.data.error
        : "Unknown error.";
      toast(errorMsj, {
        duration: 5000,
      });
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
    onError: (error) => {
      const errorMsj = axios.isAxiosError(error)
        ? error.response?.data.error
        : "Unknown error.";
      toast(errorMsj, {
        duration: 5000,
      });
    },
  });
};
