import axios from "axios";

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL ?? "";

export const axiosInstance = axios.create({
  baseURL: FRONTEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
