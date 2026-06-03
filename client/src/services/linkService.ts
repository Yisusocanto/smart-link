import { apiFetch } from "@/lib/api-fetch";

export const createLink = async (originalURL: string) => {
  const res = await apiFetch("/", {
    method: "POST",
    body: JSON.stringify({ originalURL }),
  });
  return res.json();
};

export const getAllLinks = async (cookieHeader?: string) => {
  const options: RequestInit = {};
  if (cookieHeader) {
    options.headers = { cookie: cookieHeader };
  }
  
  const res = await apiFetch("/", options);
  return res.json();
};

export const toggleLinkStatus = async (alias: string) => {
  const res = await apiFetch(`/${alias}/toggle-status`);
  return res.json();
};

export const deleteLink = async (alias: string) => {
  const res = await apiFetch(`/${alias}`, {
    method: "DELETE",
  });
  return res.json();
};

export const linkStats = async (cookieHeader?: string) => {
  const options: RequestInit = {};
  if (cookieHeader) {
    options.headers = { cookie: cookieHeader };
  }
  
  const res = await apiFetch("/stats", options);
  return res.json();
};

export const recentLinks = async (cookieHeader?: string) => {
  const options: RequestInit = {};
  if (cookieHeader) {
    options.headers = { cookie: cookieHeader };
  }
  
  const res = await apiFetch("/recents", options);
  return res.json();
};
