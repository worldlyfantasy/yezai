"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import type { Destination, TravelStyle } from "@/data";

interface Props {
  destinations: Destination[];
  styles: TravelStyle[];
}

export const CreatorFilterBar = ({ destinations, styles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDest = searchParams.get("destination") ?? "";
  const currentStyle = searchParams.get("style") ?? "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const queryString = params.toString();
    const href = `/creators${queryString ? `?${queryString}` : ""}`;
    router.push(href as Route);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-card border border-line/60 bg-surface p-4 shadow-card md:flex-row md:items-center">
      <label className="flex flex-col gap-1 text-sm text-ink">
        目的地
        <select
          value={currentDest}
          onChange={(e) => updateParam("destination", e.target.value)}
          className="rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">全部</option>
          {destinations.map((dest) => (
            <option key={dest.slug} value={dest.slug}>
              {dest.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm text-ink">
        旅行风格
        <select
          value={currentStyle}
          onChange={(e) => updateParam("style", e.target.value)}
          className="rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">全部</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
