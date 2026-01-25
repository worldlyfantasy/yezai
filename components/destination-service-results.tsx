"use client";

import { useSearchParams } from "next/navigation";
import type { ServiceType, TravelStyle } from "@/data";
import { creators, services } from "@/data";
import { ServiceCard } from "@/components/service-card";

interface Props {
  destinationSlug: string;
}

export const DestinationServiceResults = ({ destinationSlug }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as ServiceType | null;
  const style = searchParams.get("style") as TravelStyle | null;

  const filtered = services.filter((service) => {
    if (!service.destinationSlugs.includes(destinationSlug)) return false;
    if (type && service.type !== type) return false;
    if (style && !service.styles.includes(style)) return false;
    return true;
  });

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} creator={creators.find((c) => c.id === service.creatorId)} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无符合筛选的服务。</p>}
    </>
  );
};
