import { Card } from "@heroui/react";
import React from "react";
import { Link2, Activity, MousePointerClick } from "lucide-react";

interface KPICardProps {
	label: string;
	content: string | number;
	icon?: React.ReactNode;
}

function KPICard({ content, label, icon }: KPICardProps) {
	let renderedIcon = icon;
	let themeClasses = "text-accent bg-accent/10 border-accent/20";

	if (!icon) {
		const lowerLabel = label.toLowerCase();
		if (lowerLabel.includes("active")) {
			renderedIcon = <Activity size={22} />;
			themeClasses = "text-success bg-success/10 border-success/20";
		} else if (lowerLabel.includes("clicks")) {
			renderedIcon = <MousePointerClick size={22} />;
			themeClasses = "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
		} else if (lowerLabel.includes("links")) {
			renderedIcon = <Link2 size={22} />;
			themeClasses = "text-pink-400 bg-pink-500/10 border-pink-500/20";
		}
	}

	return (
		<Card className="flex flex-row justify-between items-center p-6 w-full max-w-lg border bg-linear-to-br from-surface to-surface/90 hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm rounded-2xl">
			<div className="flex flex-col gap-1">
				<h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
					{label}
				</h3>
				<span className="text-3xl font-extrabold tracking-tight mt-1">
					{content}
				</span>
			</div>
			{renderedIcon && (
				<div
					className={`p-3 rounded-xl border flex items-center justify-center ${themeClasses} transition-all duration-300`}>
					{renderedIcon}
				</div>
			)}
		</Card>
	);
}

export default KPICard;
