"use client";

import { useDeleteLink, useToggleLinkStatus } from "@/hooks/useLink";
import { Link as LinkType } from "@/types/Link";
import { Button, Card, Chip, Separator, Spinner, Tooltip } from "@heroui/react";
import dayjs from "dayjs";
import { Check, Copy, ExternalLink, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface LinkCardProps {
  link: LinkType;
  BACKEND_URL: string;
}

function LinkCard({ BACKEND_URL, link }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const { mutate: toggleStatus, isPending } = useToggleLinkStatus();
  const { mutate: deleteLink } = useDeleteLink();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${BACKEND_URL}/${link.alias}`);
    setCopied(true);
    toast("Link copied to the clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full flex flex-row justify-between border p-5">
      <div className="flex flex-col">
        <Link
          href={`${BACKEND_URL}/${link.alias}`}
          className="text-xl font-bold text-accent flex gap-2 items-center"
        >
          {`${BACKEND_URL}/${link.alias}`} <ExternalLink />
        </Link>
        <p className="text-muted">{link.originalURL}</p>
        <p className="text-muted">
          Created At: {dayjs(link.createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>
      <div className="flex gap-8">
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center m-auto">
          <h2 className="text-muted">CLICKS</h2>
          <p className="text-xl font-bold">{link.clickCount}</p>
        </div>
        <div className="flex flex-col items-center m-auto">
          <h2 className="text-muted">STATUS</h2>
          <p className="text-xl font-bold">
            {link.active ? (
              <Chip color="success">Active</Chip>
            ) : (
              <Chip color="warning">Deactive</Chip>
            )}
          </p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex gap-2 items-center">
          <Tooltip>
            <Button
              isIconOnly
              variant={link.active ? "danger-soft" : "primary"}
              onPress={() => toggleStatus(link.alias)}
              isDisabled={isPending}
            >
              {isPending ? (
                <Spinner size="sm" />
              ) : link.active ? (
                <X />
              ) : (
                <Check />
              )}
            </Button>
            <Tooltip.Content>
              {link.active ? "Deactivate link" : "Activate link"}
            </Tooltip.Content>
          </Tooltip>
          <Button isIconOnly variant="secondary" onPress={handleCopy}>
            {copied ? <Check /> : <Copy />}
          </Button>
          <Button
            isIconOnly
            variant="danger-soft"
            onPress={() => deleteLink(link.alias)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default LinkCard;
