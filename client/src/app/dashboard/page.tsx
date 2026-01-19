import RefreshButton from "@/components/common/RefreshButton";
import KPICards from "@/components/KPICards";
import LinkCard from "@/components/LinkCard";
import { getAllLinks } from "@/services/linkService";
import { Link as LinkType } from "@/types/Link";
import {
  Button,
  ButtonGroup,
  buttonVariants,
  Card,
  Separator,
} from "@heroui/react";
import { Copy, Plus, Trash } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

async function Dashboard() {
  const cookieStore = await cookies();
  const data = await getAllLinks(cookieStore.toString());

  let links: LinkType[] = [];
  links = data.links || [];

  return (
    <div className="w-full px-4 sm:px-6 md:w-11/12 lg:w-3/4 mx-auto py-6 md:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <RefreshButton />
          <Link
            className={`${buttonVariants({ variant: "primary" })} flex-1 sm:flex-initial`}
            href={"/"}
          >
            <Plus />
            <span className="hidden sm:inline">Create new Link</span>
            <span className="sm:hidden">New Link</span>
          </Link>
        </div>
      </div>
      <KPICards />
      <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8">
        {links.map((link) => (
          <LinkCard link={link} BACKEND_URL={BACKEND_URL} key={link._id} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
