import KPICards from "@/components/feature/KPICards";
import LinkCard from "@/components/feature/LinkCard";
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
    <div className="w-3/4 mx-auto px-10 py-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Link className={buttonVariants({ variant: "primary" })} href={"/"}>
          <Plus />
          New Link
        </Link>
      </div>
      <KPICards />
      <div className="flex flex-col gap-4 mt-8">
        {links.map((link) => (
          <LinkCard link={link} BACKEND_URL={BACKEND_URL} key={link._id} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
