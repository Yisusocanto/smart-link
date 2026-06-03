import { redirect } from "next/navigation";

/**
 * Cliente de fetch unificado.
 * AHORA: Usa el proxy local (/api/proxy) para evitar problemas de CORS y Cookies.
 */
export async function apiFetch(path: string, options: RequestInit = {}) {
  // En el cliente usamos ruta relativa al proxy. En el servidor usamos la URL del backend directa.
  const isServer = typeof window === "undefined";
  const baseURL = isServer 
    ? (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001")
    : ""; // En cliente, relativo al dominio actual
    
  const prefix = isServer ? "" : "/api/proxy";
  const url = `${baseURL}${prefix}${path}`;
  
  const defaultOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  };

  const response = await fetch(url, defaultOptions);

  if (response.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    } else {
      redirect("/login");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.error || "Something went wrong");
    throw error;
  }

  return response;
}
