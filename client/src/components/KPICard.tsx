import { Card } from "@heroui/react";
import React from "react";

interface KPICardProps {
	label: string;
	content: string;
	icon?: React.ReactNode;
}

async function KPICard({ content, label, icon }: KPICardProps) {
	return (
		<Card className="flex flex-row justify-between gap-4 w-full max-w-lg border px-4">
			<div>
				<h3 className="text-lg uppercase tracking-widest">{label}</h3>
				<span className="text-4xl font-bold">{content}</span>
			</div>
			{icon && <div>{icon}</div>}
		</Card>
	);
}

export default KPICard;
