"use client";

import { useSearchParams } from "next/navigation";
import { filterDestinations } from "@/data/helpers";
import { DestinationCard } from "@/components/destination-card";

export const DestinationResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? undefined;
  const filtered = filterDestinations(query);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无匹配结果。</p>}
    </>
  );
};
