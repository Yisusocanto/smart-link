import { axiosInstance } from "@/lib/axiosConfig";
import { User } from "@/types/User";

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/auth/signup", userData);
  return data;
};

export const login = async (credentials: {
  email?: string;
  username?: string;
  password: string;
}) => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.get("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
