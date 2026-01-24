"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ServiceType, TravelStyle } from "@/data";

interface Props {
  destinationSlug: string;
  types: ServiceType[];
  styles: TravelStyle[];
}

export const ServiceFilterBar = ({ destinationSlug, types, styles }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentType = params.get("type") ?? "";
  const currentStyle = params.get("style") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const query = next.toString() ? `?${next.toString()}` : "";
    router.push(`/destinations/${destinationSlug}${query}`);
  };

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-card border border-line/60 bg-surface p-4 shadow-card md:flex-row md:items-center">
      <div className="flex flex-1 flex-col gap-1 text-sm text-ink">
        服务类型
        <select
          value={currentType}
          onChange={(event) => update("type", event.target.value)}
          className="rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">全部</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-1 flex-col gap-1 text-sm text-ink">
        旅行风格
        <select
          value={currentStyle}
          onChange={(event) => update("style", event.target.value)}
          className="rounded-card border border-line bg-surface px-3 py-2 text-sm"
        >
          <option value="">全部</option>
          {styles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
