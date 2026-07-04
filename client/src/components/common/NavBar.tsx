"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "@/components/UserDropdown";
import Link from "next/link";
import Image from "next/image";

const loginLinks = [{ label: "Dashboard", href: "/dashboard" }];

const logoutLinks = [
	{ label: "Login", href: "/login" },
	{ label: "Sign Up", href: "/register" },
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
			fetchOptions: { onSuccess: () => router.push("/login") },
		});
	};

	return (
		<div className="sticky top-5 z-50 mt-4 mb-10 h-14 w-full sm:w-3/4 md:w-3/5 lg:w-3/6 m-auto bg-surface rounded-4xl items-center px-4 sm:px-10 justify-between flex border shadow-lg/50 shadow-accent/20">
			<div className="flex items-center gap-2">
				<Link href={"/"} className="text-base sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2">
					<Image
						alt="Smart Link logo"
						src={"/logo.png"}
						width={30}
						height={30}
						className="sm:w-[35px] sm:h-[35px]"
					/>
					<span>Smart <span className="text-accent">Link</span></span>
				</Link>
			</div>
			<div className="flex gap-2 sm:gap-4">
				<div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							prefetch={false}
							className={`${pathname == link.href ? "text-white font-semibold" : "text-gray-300"} hover:underline `}>
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
