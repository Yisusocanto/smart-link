"use client";

import { handleCopy } from "@/lib/handleCopy";
import { Button } from "@heroui/react";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ shortenLink }: { shortenLink: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<Button
			isIconOnly
			onPress={() => handleCopy(shortenLink, setCopied)}
			className=""
			variant="secondary">
			{copied ? <Check /> : <Copy />}
		</Button>
	);
}

export default CopyButton;
