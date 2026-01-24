import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/data";

export const DestinationCard = ({ destination }: { destination: Destination }) => (
  <Link
    href={`/destinations/${destination.slug}`}
    className="group flex flex-col overflow-hidden rounded-card border border-line/50 bg-surface shadow-card"
  >
    <Image src={destination.cover} alt={destination.name} width={640} height={400} className="h-48 w-full object-cover" />
    <div className="flex flex-1 flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif-cn text-2xl text-ink">{destination.name}</h3>
        <span className="text-xs text-ink-2">{destination.routeCount} 条路线 · {destination.creatorCount} 位创作者</span>
      </div>
      <p className="text-sm text-ink-2 leading-relaxed">{destination.description}</p>
    </div>
  </Link>
);
