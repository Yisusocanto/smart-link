import { BACKEND_URL } from "@/constants/backURL";
import { Link } from "@/types/Link";
import { toast } from "sonner";

export const handleCopy = (
  link: Link,
  setStateFunction: (x: boolean) => void,
) => {
  navigator.clipboard.writeText(`${BACKEND_URL}/${link.alias}`);
  setStateFunction(true);
  toast("Link copied to the clipboard.");
  setTimeout(() => setStateFunction(false), 2000);
};
