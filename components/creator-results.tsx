"use client";

import { useSearchParams } from "next/navigation";
import type { TravelStyle } from "@/data";
import { filterCreators } from "@/data/helpers";
import { CreatorCard } from "@/components/creator-card";

export const CreatorResults = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? undefined;
  const styleParam = searchParams.get("style") as TravelStyle | null;

  const filtered = filterCreators({
    destination,
    style: styleParam ?? undefined
  });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无符合条件的创作者。</p>}
    </>
  );
};
