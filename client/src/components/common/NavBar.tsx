"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";
import Image from "next/image";

const loginLinks = [{ label: "Dashboard", href: "/dashboard" }];

const logoutLinks = [
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "/register" },
];

function NavBar() {
  const { data: session, isPending: loading } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = !!session;
  const user = session?.user;

  const links = isAuthenticated ? loginLinks : logoutLinks;

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <div className="h-14 w-full bg-[#1a1a1d] items-center px-10  justify-between flex border-b border-b-gray-700">
      <div className="flex items-center gap-2">
        <Link href={"/"} className="text-xl font-bold flex items-center">
          <Image
            alt="Smart Link logo"
            src={"/logo.png"}
            width={35}
            height={35}
          />
          Smart <span className="text-accent">Link</span>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              prefetch={false}
              className={`${pathname == link.href ? "text-white font-semibold" : "text-gray-300"} hover:underline `}
            >
              {link.label}
            </Link>
          ))}
        </div>
        {isAuthenticated && !loading && (
          <UserDropdown user={user as any} logoutFn={logout} />
        )}
      </div>
    </div>
  );
}

export default NavBar;
