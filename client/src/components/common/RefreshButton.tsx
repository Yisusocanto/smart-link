"use client";

import { Button } from "@heroui/react";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

function RefreshButton() {
  const router = useRouter();
  return (
    <Button isIconOnly onPress={() => router.refresh()} variant="secondary">
      <RefreshCcw />
    </Button>
  );
}

export default RefreshButton;
