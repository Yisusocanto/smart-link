"use client";

import { useDeleteLink, useToggleLinkStatus } from "@/hooks/useLink";
import { Link as LinkType } from "@/types/Link";
import { Button, Card, Chip, Separator, Spinner, Tooltip } from "@heroui/react";
import dayjs from "dayjs";
import { Check, Copy, ExternalLink, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { handleCopy } from "@/lib/handleCopy";

interface LinkCardProps {
  link: LinkType;
  BACKEND_URL: string;
}

function LinkCard({ BACKEND_URL, link }: LinkCardProps) {
  const [copied, setCopied] = useState(false);

  const { mutate: toggleStatus, isPending } = useToggleLinkStatus();
  const { mutate: deleteLink } = useDeleteLink();

  return (
    <Card className="w-full flex flex-col md:flex-row justify-between border p-4 md:p-5 gap-4">
      {/* Link Information Section */}
      <div className="flex flex-col gap-1 min-w-0 flex-1 text-center md:text-start">
        <Link
          href={`${BACKEND_URL}/${link.alias}`}
          className="text-lg md:text-xl  m-auto md:m-0 font-bold text-blue-500 hover:text-blue-400 flex gap-2 items-center break-all"
        >
          {`${BACKEND_URL}/${link.alias}`} <ExternalLink className="shrink-0" />
        </Link>
        <p className="text-muted text-sm md:text-base truncate max-w-full">
          {link.originalURL}
        </p>
        <p className="text-muted text-xs md:text-sm">
          Created on {dayjs(link.createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>

      {/* Stats and Actions Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mx-auto md:m-0">
        {/* Stats Section */}
        <div className="flex gap-4 sm:gap-8 justify-around sm:justify-start items-center">
          <div className="hidden lg:block h-12 w-px bg-gray-700"></div>

          {/* Clicks */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-muted text-xs uppercase">CLICKS</h2>
            <p className="text-xl font-bold">{link.clickCount}</p>
          </div>

          {/* Status */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-muted text-xs uppercase">STATUS</h2>
            <p className="text-xl font-bold">
              {link.active ? (
                <Chip color="success">Active</Chip>
              ) : (
                <Chip color="warning">Deactive</Chip>
              )}
            </p>
          </div>

          <div className="hidden lg:block h-12 w-px bg-gray-700"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center justify-center sm:justify-start">
          <Tooltip>
            <Button
              isIconOnly
              variant={link.active ? "danger-soft" : "primary"}
              onPress={() => toggleStatus(link.alias)}
              isDisabled={isPending}
              className="min-w-10 min-h-10"
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
          <Button
            isIconOnly
            variant="secondary"
            onPress={() => handleCopy(link, setCopied)}
            className="min-w-10 min-h-10 hover:bg-gray-800"
          >
            {copied ? <Check /> : <Copy />}
          </Button>
          <Button
            isIconOnly
            variant="danger-soft"
            onPress={() => deleteLink(link.alias)}
            className="min-w-10 min-h-10"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default LinkCard;
