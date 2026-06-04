import { Link } from "./Link";

export interface CreateLinkResponse {
  shortenLink: string;
  originalURL: string;
}

export interface GetAllLinksResponse {
  links: Link[];
}

export interface ToggleLinkStatusResponse {
  link: string;
  success: boolean;
}

export interface DeleteLinkResponse {
  success: string;
}

export interface LinkStatsResponse {
  totalLinks: number;
  totalActiveLinks: number;
  totalClicks: number;
}

export interface RecentLinksResponse {
  recentLinks: Link[];
}
