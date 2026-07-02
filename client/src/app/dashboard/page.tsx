import KPICard from "@/components/KPICard";
import TableLinks from "@/components/TableLinks";
import { getAllLinks, linkStats } from "@/services/linkService";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

async function Dashboard() {
	const cookieStore = await cookies();
	const [links, stats] = await Promise.all([
		getAllLinks(cookieStore.toString()),
		linkStats(cookieStore.toString()),
	]);

	return (
		<div className="flex flex-col gap-10">
			<div>
				<h1 className="text-4xl sm:text-6xl font-bold">Dashboard</h1>
				<p className="text-muted text-sm sm:text-lg max-w-xl">
					Manage your active redirects, monitor angagement, and configure
					advance routing logic.
				</p>
			</div>
			<div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
				{stats.map((stat) => (
					<KPICard key={stat.label} label={stat.label} content={stat.content} />
				))}
			</div>
			<div>
				<TableLinks links={links.links} />
			</div>
		</div>
	);
}

export default Dashboard;
