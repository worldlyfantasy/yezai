import Link from "next/link";
import type { Service, Creator } from "@/data";

export const ServiceCard = ({ service, creator }: { service: Service; creator?: Creator }) => (
  <Link href={`/services/${service.slug}`} className="flex flex-col gap-3 rounded-card border border-line/70 bg-surface p-5 shadow-card transition hover:-translate-y-1">
    <div className="flex items-center justify-between text-xs text-ink-2">
      <span className="rounded-chip bg-wash px-3 py-1 text-brand">{service.type}</span>
      <span>{service.durationTag}</span>
    </div>
    <h3 className="font-serif-cn text-2xl text-ink">{service.name}</h3>
    <p className="text-sm text-ink-2 leading-relaxed">{service.summary}</p>
    {creator && <p className="text-sm text-ink">由 {creator.name}</p>}
    <div className="flex items-center justify-between text-sm text-ink">
      <span>{service.price}</span>
      <span className="text-ink-2">查看详情 →</span>
    </div>
  </Link>
);
