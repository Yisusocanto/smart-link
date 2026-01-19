import { axiosInstance } from "@/lib/axiosConfig";

export const createLink = async (originalURL: string) => {
  const { data } = await axiosInstance.post("/", {
    originalURL,
  });
  return data;
};

export const getAllLinks = async (cookieStore: string | null) => {
  const { data } = await axiosInstance.get("/", {
    headers: { cookie: cookieStore },
  });
  return data;
};

export const toggleLinkStatus = async (alias: string) => {
  const { data } = await axiosInstance.get(`/${alias}/toggle-status`);
  return data;
};

export const deleteLink = async (alias: string) => {
  const { data } = await axiosInstance.delete(`/${alias}`);
  return data;
};

export const linkStats = async (cookieStore: string) => {
  const { data } = await axiosInstance.get("/stats", {
    headers: { cookie: cookieStore },
  });
  return data;
};

export const recentLinks = async (cookieStore: string) => {
  const { data } = await axiosInstance.get("/recents", {
    headers: { cookie: cookieStore },
  });
  return data;
};
