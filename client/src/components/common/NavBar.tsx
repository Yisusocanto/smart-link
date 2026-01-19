"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@heroui/react";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "../auth/UserDropdown";
import Link from "next/link";

const loginLinks = [{ label: "Dashboard", href: "/dashboard" }];

const logoutLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

function NavBar() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const links = isAuthenticated ? loginLinks : logoutLinks;

  return (
    <div className="h-14 w-full items-center px-10  justify-between flex border-b border-b-gray-700">
      <div className="flex items-center gap-2">
        <X />
        <h1 className="text-xl font-bold">Smart Link</h1>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`${pathname == link.href ? "text-white" : "text-muted"} hover:underline`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {isAuthenticated && loading == false && <UserDropdown />}
      </div>
    </div>
  );
}

export default NavBar;
