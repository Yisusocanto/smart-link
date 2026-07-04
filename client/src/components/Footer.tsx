import { linkVariants } from "@heroui/react";
import Link from "next/link";

function Footer() {
	const linkSlot = linkVariants();
	return (
		<footer className="h-20 flex justify-between items-center border-t">
			<h3 className="text-xl font-bold">Smart Link</h3>
			<span>&copy; 2026 JESUS OCANTO. ALL RIGHTS RESERVED.</span>
			<div>
				<ul>
					<li>
						<Link
							className={linkSlot.base()}
							href={"https://github.com/Yisusocanto/smart-link"}
							target="_blank">
							GITHUB
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
