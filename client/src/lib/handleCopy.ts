import { toast } from "@heroui/react";

export const handleCopy = (
	link: string,
	setStateFunction: (x: boolean) => void,
) => {
	navigator.clipboard.writeText(link);
	setStateFunction(true);
	toast.success("Link copied to the clipboard.");
	setTimeout(() => setStateFunction(false), 2000);
};
