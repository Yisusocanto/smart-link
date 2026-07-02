import UrlForm from "@/components/UrlForm";
import { recentLinks } from "@/services/linkService";
import { Link as LinkType } from "@/types/Link";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/constants/backURL";
import { Button, buttonVariants, Card, Chip } from "@heroui/react";
import {
	ChartNoAxesCombined,
	Dot,
	HandHeart,
	Shell,
	Shield,
	ToggleRight,
} from "lucide-react";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";

async function Home() {
	const slotPrimary = buttonVariants();
	const slotOutline = buttonVariants({ variant: "outline" });
	const cookieStore = await cookies();
	let recentLinksArray: LinkType[] | [] = [];

	try {
		const data = await recentLinks(cookieStore.toString());
		recentLinksArray = data.recentLinks;
	} catch (error) {
		recentLinksArray = [];
	}

	return (
		<div className="py-12 md:py-10 flex flex-col gap-10">
			<div className="mt-10 md:mt-30 mb-8 md:mb-10 text-center flex flex-col gap-4">
				<h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 px-2">
					Shorten your reach <br />{" "}
					<strong className="text-accent">stay in control</strong>
				</h1>
				<p className="text-muted text-sm sm:text-xl px-6 max-w-lg mx-auto">
					Paste a long URL to shorten it instantly. Track clicks and analyze
					your audience with precision.
				</p>
			</div>
			<div className="max-w-2xl mx-auto mb-10">
				<UrlForm />
			</div>

			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-1 sm:grid-cols-10 gap-4">
					<Card className="w-full col-span-1 sm:col-span-7 flex flex-col md:flex-row gap-6 p-6 items-start md:items-center border">
						<div>
							<span className="text-accent text-sm flex gap-2 items-center">
								<ChartNoAxesCombined size={16} /> Real-time insights
							</span>
							<h3 className="text-2xl font-bold">Granular analytics</h3>
							<p className="text-muted">
								Track performance with precision. Monitor total clicks, referral
								sources across your entire link fleet.
							</p>
						</div>
						<div>aca va algo</div>
					</Card>
					<Card className="w-full col-span-1 sm:col-span-3 flex flex-col justify-between gap-6 p-6 border">
						<div>
							<span className="text-accent text-sm flex gap-2 items-center">
								<ToggleRight size={16} /> Total control
							</span>
							<h3 className="text-2xl font-bold">Link governance</h3>
							<p className="text-muted">
								Instantly active, deactivate or purge links. Take control of
								your traffic flows with zero propagation delay.
							</p>
						</div>
						<div>aca va algo</div>
					</Card>
					<Card className="w-full col-span-1 sm:col-span-5 border flex flex-row items-start gap-4 p-6">
						<div>
							<div className="p-2 bg-accent/10 rounded-lg border">
								<Shield className="text-accent" />
							</div>
						</div>
						<div>
							<h3 className="text-2xl font-bold">Privacy first</h3>
							<p className="text-muted">
								We don't sell your data. Redirects are procesed without invasive
								tracking pixels or personal data harvesting.
							</p>
						</div>
					</Card>
					<Card className="w-full col-span-1 sm:col-span-5 border flex flex-row items-start gap-4 p-6">
						<div>
							<div className="p-2 bg-accent/10 rounded-lg border">
								<HandHeart className="text-accent" />
							</div>
						</div>
						<div>
							<h3 className="text-2xl font-bold">Always free</h3>
							<p className="text-muted">
								Our core infrastructure will always be free for developers.
								Scale your projects without worrying about hidden costs.
							</p>
						</div>
					</Card>
				</div>
			</div>

			<Card className="border text-center py-10">
				<h2 className="text-3xl sm:text-5xl font-bold">
					Ready to take control <br /> of your links?
				</h2>
				<p>
					Join thousands of developers building faster, safer redirections with
					Smart Link.
				</p>
				<div className="flex gap-4 justify-center">
					<Link href="/register" className={slotPrimary}>
						Get started
					</Link>
					<Link
						href={"https://github.com/Yisusocanto/smart-link"}
						target="_blank"
						className={slotOutline}>
						Read documentation
					</Link>
				</div>
			</Card>
		</div>
	);
}

export default Home;
