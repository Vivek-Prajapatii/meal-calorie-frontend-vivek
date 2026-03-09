"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1 pl-2 text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => router.back()}
    >
      <ChevronLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
