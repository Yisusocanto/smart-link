import UrlForm from "@/components/UrlForm";
import { buttonVariants, Card } from "@heroui/react";
import {
	ChartNoAxesCombined,
	HandHeart,
	Shield,
	ToggleRight,
	Link2,
} from "lucide-react";
import Link from "next/link";
import { recentLinks } from "@/services/linkService";
import { Link as LinkType } from "@/types/Link";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/constants/backURL";
import LinkCard from "@/components/LinkCard";

async function Home() {
	const slotPrimary = buttonVariants();
	const slotOutline = buttonVariants({ variant: "outline" });
	const cookieStore = await cookies();
	let recentLinksArray: LinkType[] | [] = [];
	let isAuthenticated = false;

	try {
		const data = await recentLinks(cookieStore.toString());
		recentLinksArray = data.recentLinks || [];
		isAuthenticated = true;
	} catch (error) {
		recentLinksArray = [];
		isAuthenticated = false;
	}

	return (
		<div className="py-12 md:py-10 flex flex-col gap-12 relative overflow-hidden">
			{" "}
			<div className="mt-10 md:mt-24 mb-8 md:mb-10 text-center flex flex-col gap-5 max-w-3xl mx-auto">
				<h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-2 px-2 tracking-tight leading-[1.1] text-white">
					Shorten your reach <br />{" "}
					<span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-indigo-400 to-pink-500">
						stay in control
					</span>
				</h1>
				<p className="text-muted text-sm sm:text-lg md:text-xl px-6 max-w-xl mx-auto leading-relaxed">
					Paste a long URL to shorten it instantly. Track clicks and analyze
					your audience in real-time with ultimate precision.
				</p>
			</div>
			<div className="w-full sm:max-w-4xl mx-auto mb-10 px-2 sm:px-0">
				<UrlForm />
			</div>
			{isAuthenticated && (
				<div className="flex flex-col gap-6 mt-4 border-t border-border/40 pt-10">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div>
							<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
								<span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
								Your Recent Links
							</h2>
							<p className="text-muted text-xs sm:text-sm mt-1">
								Quick access to your recently shortened URLs and live metrics.
							</p>
						</div>
						<Link
							href="/dashboard"
							className={`${slotOutline} w-full sm:w-auto shadow-sm hover:shadow-accent/5 transition-all`}>
							Go to Dashboard
						</Link>
					</div>

					{recentLinksArray.length > 0 ? (
						<div className="flex flex-col gap-4">
							{recentLinksArray.slice(0, 3).map((link) => (
								<LinkCard
									key={link._id}
									link={link}
									BACKEND_URL={BACKEND_URL ?? ""}
								/>
							))}
						</div>
					) : (
						<Card className="p-8 text-center flex flex-col items-center gap-4 border border-dashed bg-surface/30 backdrop-blur-sm rounded-2xl">
							<div className="p-3 rounded-full bg-accent/10 text-accent border border-accent/20">
								<Link2 size={24} />
							</div>
							<div>
								<h3 className="text-lg font-semibold text-white">
									No shortened links yet
								</h3>
								<p className="text-muted text-xs sm:text-sm max-w-sm mx-auto mt-1">
									Paste a long URL in the field above to generate your first
									redirect link.
								</p>
							</div>
							<Link href="/dashboard" className={slotPrimary}>
								Go to Dashboard
							</Link>
						</Card>
					)}
				</div>
			)}
			<div className="flex flex-col gap-4 border-t border-border/40 pt-10">
				<h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
					Engineered for scale
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-10 gap-4">
					<Card className="w-full col-span-1 md:col-span-6 flex flex-col sm:flex-row gap-6 p-6 items-start sm:items-center border bg-linear-to-b from-surface to-surface/90 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-accent/5 rounded-2xl">
						<div className="flex-1 flex flex-col gap-2">
							<span className="text-accent text-xs font-bold uppercase tracking-wider flex gap-2 items-center">
								<ChartNoAxesCombined size={14} /> Real-time insights
							</span>
							<h3 className="text-2xl font-bold text-white tracking-tight">
								Granular analytics
							</h3>
							<p className="text-muted text-sm leading-relaxed">
								Track performance with precision. Monitor total clicks, referral
								sources across your entire link fleet instantly.
							</p>
						</div>

						<div className="w-full sm:w-[240px] flex flex-col gap-3 bg-surface-secondary/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm self-stretch justify-center">
							<div className="flex justify-between items-center border-b border-border/30 pb-2">
								<span className="text-[10px] font-bold uppercase tracking-wider text-muted">
									Traffic Sources
								</span>
								<span className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-medium flex items-center gap-1 animate-pulse">
									<span className="w-1.5 h-1.5 rounded-full bg-success"></span>{" "}
									Live
								</span>
							</div>
							<div className="flex flex-col gap-2.5">
								<div className="flex items-center gap-2 text-xs">
									<span className="w-12 text-muted truncate">Direct</span>
									<div className="flex-1 bg-default/40 h-2 rounded-full overflow-hidden">
										<div className="bg-linear-to-r from-accent to-indigo-500 h-full rounded-full w-[75%]" />
									</div>
									<span className="font-semibold text-right w-8 text-white">
										75%
									</span>
								</div>
								<div className="flex items-center gap-2 text-xs">
									<span className="w-12 text-muted truncate">Github</span>
									<div className="flex-1 bg-default/40 h-2 rounded-full overflow-hidden">
										<div className="bg-linear-to-r from-pink-500 to-rose-400 h-full rounded-full w-[45%]" />
									</div>
									<span className="font-semibold text-right w-8 text-white">
										45%
									</span>
								</div>
								<div className="flex items-center gap-2 text-xs">
									<span className="w-12 text-muted truncate">Twitter</span>
									<div className="flex-1 bg-default/40 h-2 rounded-full overflow-hidden">
										<div className="bg-linear-to-r from-cyan-400 to-blue-500 h-full rounded-full w-[25%]" />
									</div>
									<span className="font-semibold text-right w-8 text-white">
										25%
									</span>
								</div>
							</div>
						</div>
					</Card>

					<Card className="w-full col-span-1 md:col-span-4 flex flex-col justify-between gap-6 p-6 border bg-linear-to-b from-surface to-surface/90 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-accent/5 rounded-2xl">
						<div className="flex flex-col gap-2">
							<span className="text-accent text-xs font-bold uppercase tracking-wider flex gap-2 items-center">
								<ToggleRight size={14} /> Total control
							</span>
							<h3 className="text-2xl font-bold text-white tracking-tight">
								Link governance
							</h3>
							<p className="text-muted text-sm leading-relaxed">
								Instantly activate, deactivate or purge links. Take control of
								your traffic flows with zero propagation delay.
							</p>
						</div>

						<div className="flex flex-col gap-2.5 mt-2">
							<div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-surface-secondary/20 hover:border-accent/20 transition-all">
								<div className="flex flex-col min-w-0">
									<span className="text-xs font-semibold truncate text-white">
										smart.lk/promo-code
									</span>
									<span className="text-[10px] text-muted truncate">
										Active Redirect
									</span>
								</div>
								<div className="flex items-center gap-1.5 bg-success/15 text-success px-2 py-0.5 rounded-full border border-success/20">
									<span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
									<span className="text-[10px] font-bold uppercase tracking-wider">
										Active
									</span>
								</div>
							</div>
							<div className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-surface-secondary/10 hover:border-accent/15 transition-all opacity-80 hover:opacity-100">
								<div className="flex flex-col min-w-0">
									<span className="text-xs font-semibold truncate text-white">
										smart.lk/expired-v1
									</span>
									<span className="text-[10px] text-muted truncate">
										Paused Redirect
									</span>
								</div>
								<div className="flex items-center gap-1.5 bg-warning/15 text-warning px-2 py-0.5 rounded-full border border-warning/20">
									<span className="w-1.5 h-1.5 rounded-full bg-warning" />
									<span className="text-[10px] font-bold uppercase tracking-wider">
										Paused
									</span>
								</div>
							</div>
						</div>
					</Card>

					<Card className="w-full col-span-1 md:col-span-5 border flex flex-row items-start gap-4 p-6 bg-linear-to-b from-surface to-surface/90 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-accent/5 rounded-2xl">
						<div className="p-3 bg-accent/10 rounded-xl border border-accent/20 text-accent">
							<Shield size={20} />
						</div>
						<div className="flex flex-col gap-1.5">
							<h3 className="text-2xl font-bold text-white tracking-tight">
								Privacy first
							</h3>
							<p className="text-muted text-sm leading-relaxed">
								We don't sell your data. Redirects are processed without
								invasive tracking pixels or personal data harvesting.
							</p>
						</div>
					</Card>

					<Card className="w-full col-span-1 md:col-span-5 border flex flex-row items-start gap-4 p-6 bg-linear-to-b from-surface to-surface/90 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-accent/5 rounded-2xl">
						<div className="p-3 bg-accent/10 rounded-xl border border-accent/20 text-accent">
							<HandHeart size={20} />
						</div>
						<div className="flex flex-col gap-1.5">
							<h3 className="text-2xl font-bold text-white tracking-tight">
								Always free
							</h3>
							<p className="text-muted text-sm leading-relaxed">
								Our core infrastructure will always be free for developers.
								Scale your projects without worrying about hidden costs.
							</p>
						</div>
					</Card>
				</div>
			</div>
			<Card className="border p-6 sm:p-10 text-center relative overflow-hidden bg-linear-to-br from-surface via-surface to-accent/5 hover:border-accent/25 hover:shadow-accent/5 transition-all duration-300 rounded-2xl shadow-lg mt-6">
				<div className="absolute top-0 right-0 w-[200px] h-[200px] bg-accent/5 rounded-full blur-[60px] pointer-events-none" />
				<h2 className="text-2xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
					{isAuthenticated
						? "Manage your links with precision"
						: "Ready to take control of your links?"}
				</h2>
				<p className="text-muted text-xs sm:text-base max-w-lg mx-auto leading-relaxed mb-6">
					{isAuthenticated
						? "Access advanced routing rules, live click analytics, and download statistics for your fleet of links."
						: "Join thousands of developers building faster, safer, and cleaner redirections with Smart Link."}
				</p>
				<div className="flex flex-col sm:flex-row gap-3 justify-center items-center sm:items-center">
					<Link
						href={isAuthenticated ? "/dashboard" : "/register"}
						className={`${slotPrimary} px-6 py-2.5 shadow-md shadow-accent/10 hover:shadow-accent/20 transition-all text-center`}>
						{isAuthenticated ? "Go to Dashboard" : "Get started"}
					</Link>
					<Link
						href={"https://github.com/Yisusocanto/smart-link"}
						target="_blank"
						className={`${slotOutline} px-6 py-2.5 text-center`}>
						Read documentation
					</Link>
				</div>
			</Card>
		</div>
	);
}

export default Home;
