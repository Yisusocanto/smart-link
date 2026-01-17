import { axiosInstance } from "@/lib/axiosConfig";

export const createLink = async (originalURL: string) => {
  const { data } = await axiosInstance.post("/", {
    originalURL,
  });
  return data;
};
