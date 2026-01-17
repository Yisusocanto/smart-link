import { createLink } from "@/services/linkService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateLink = () => {
  return useMutation({
    mutationFn: (originalURL: string) => createLink(originalURL),
  });
};
