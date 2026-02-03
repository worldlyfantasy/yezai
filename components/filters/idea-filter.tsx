"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import type { Idea } from "@/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  themes: Idea["theme"][];
}

export const IdeaFilterBar = ({ themes }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("theme") ?? "";

  const toggle = (theme: string) => {
    const next = new URLSearchParams(params.toString());
    if (current === theme) {
      next.delete("theme");
    } else {
      next.set("theme", theme);
    }
    const queryString = next.toString();
    const href = `/ideas${queryString ? `?${queryString}` : ""}`;
    router.push(href as Route);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {themes.map((theme) => (
        <Button
          key={theme}
          variant="outline"
          size="sm"
          onClick={() => toggle(theme)}
          className={cn(
            "rounded-chip border border-border px-3 py-1 text-sm text-muted-foreground hover:border-primary hover:text-primary",
            current === theme && "border-primary text-primary"
          )}
        >
          {theme}
        </Button>
      ))}
    </div>
  );
};
